import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FoodContext } from "../context/FoodContext";
import { toast, ToastContainer } from "react-toastify";
import { addNewFood } from "../services/all_api";
import { server_url } from "../services/server_url";
function ViewFoodItems() {
  const { allFoodItems } = useContext(FoodContext);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState();

  const filteredFoods = allFoodItems.filter((food) =>
    Object.values(food).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const [foodData, setFoodData] = useState({
    foodImage: "",
    foodName: "",
    description: "",
    type: "Vegetarian", // Default category
    price: "",
  });
  const handleAddFood = async (e) => {
    e.preventDefault();
    const { foodImage, foodName, description, type, price } = foodData;
    if (!foodImage||! foodName|| !description|| !type|| !price) {
      toast.info("please fill the input fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("foodImage", foodImage);
      reqBody.append("foodName", foodName);
      reqBody.append("description", description);
      reqBody.append("type", type);
      reqBody.append("price", price);
      
      const reqHeader = {
        "Content-Type": "multipart/form-data",
      };
      try {
        const result = await addNewFood(reqBody, reqHeader);
        console.log("result=> ", result);
        if (result.status == 200) {
          console.log("Food Added");
          setFoodData({
            foodImage: "",
            foodName: "",
            description: "",
            type: "Vegetarian", // Default category
            price: "",
          });
          toast.success("Food Added Successfully");
        } else {
          toast.warn(result.response.data);
        }
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    }

    handleClose();
  };
  useEffect(() => {
    if (
      foodData.foodImage.type == "image/png" ||
      foodData.foodImage.type == "image/jpg" ||
      foodData.foodImage.type == "image/jpeg"
    ) {
      // setPreview(URL.createObjectURL(registerData.profilePicture));
      const objectUrl = URL.createObjectURL(foodData.foodImage);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      toast.warn("please upload only following formats  (png/jpg/jpeg)");
    }
    // if (foodData.foodImage) {
      // const objectUrl = URL.createObjectURL(foodData.foodImage);
      // setPreview(objectUrl);

      // return () => URL.revokeObjectURL(objectUrl);
    // }
  }, [foodData.foodImage]);
  return (
    <>
      <div className="search-bar pe-5    d-flex align-items-center justify-content-between ">
        <div className="bg-gray-100 m-4 ms-5 border-b-gray-600 border-b-2 text-xl flex justify-between items-center px-3">
          <input
            type="text"
            placeholder="Search A Food"
            className="border-0 bg-transparent outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center my-4 box rounded-1 shadow  p-2 ">
          <h3 className="">
            Total Foods :
            <span className="fs-4 text-success">{allFoodItems.length}</span>
          </h3>
        </div>
        <Button
          variant="primary"
          className="col-lg-2 py-2"
          onClick={handleShow}
        >
          Add Food
        </Button>
      </div>

      <div className="table-area mx-5">
        <table class="table table-striped p-5">
          <thead className="bg-dark" style={{ background: "#29355f" }}>
            <tr className="table-dark ">
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody className="p-5 ">
            {filteredFoods && filteredFoods.length > 0 ? (
              filteredFoods.map((food, index) => (
                <tr className="w-25" style={{ overflowX: "auto" }}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                     src={`${server_url}/uploads/${food.foodImage}`}
                      alt={food.foodName}
                      style={{ width: "150px" }}
                    />
                  </td>
                  <td>{food.foodName}</td>
                  <td>{food.description}</td>
                  <td>{food.type}</td>
                  <td>{food.price}</td>

                  <td>
                    <i class="fa-solid fa-pen-to-square text-danger"></i>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="6">
                  <h1 className="text-danger text-center">
                    Food Not Found In The List!
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="py-3 px-5 d-flex flex-column gap-3">
          <h1 className="text-center text-capitalize">Add New Food</h1>
          <label
            className="w-100 d-flex justify-content-center"
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              hidden
              onChange={(e) =>
                setFoodData({
                  ...foodData,
                  foodImage: e.target.files[0],
                })
              }
            />
            <img
              src={
                preview
                  ? preview
                  : "https://static.vecteezy.com/system/resources/previews/047/411/214/non_2x/food-logo-icon-symbol-silhouette-on-white-background-free-vector.jpg"
              }
              alt="food placeholder"
              style={{ width: "10rem" }}
            />
          </label>
          <input
            type="text"
            name="name"
            placeholder="Food Name"
            className="form-control rounded-3 border-1 border-secondary fw-bold"
            value={foodData.name}
            // onChange={handleInputChange}
            onChange={(e) =>
              setFoodData({ ...foodData, foodName: e.target.value })
            }
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="form-control rounded-3 border-1 border-secondary fw-bold"
            value={foodData.description}
            // onChange={handleInputChange}
            onChange={(e) =>
              setFoodData({ ...foodData, description: e.target.value })
            }
          />
          <select
            name="category"
            className="form-control  rounded-3 border-1 border-secondary fw-bold"
            value={foodData.category}
            // onChange={handleInputChange}
            onChange={(e) => setFoodData({ ...foodData, type: e.target.value })}
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
          </select>
          <input
            type="text"
            name="price"
            placeholder="Price"
            className="form-control rounded-3 border-1 border-secondary fw-bold"
            value={foodData.price}
            // onChange={handleInputChange}
            onChange={(e) =>
              setFoodData({ ...foodData, price: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddFood}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </>
  );
}

export default ViewFoodItems;
