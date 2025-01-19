import React, { useEffect, useState } from "react";
import { getUserData } from "../services/all_api";
import { server_url } from "../services/server_url";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [loggedUserData, setLoggedUserData] = useState({});
  const fetchLoggedUserData = async () => {
    try {
      const result = await getUserData({ userId });
      setLoggedUserData(result.data[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    sessionStorage.clear();
  };
  useEffect(() => {
    fetchLoggedUserData();
  }, [userId]);

  return (
    <div>
      <div className="card rounded shadow mx-40 mt-32 p-5 flex flex-col lg:flex-row">
        <div className="flex justify-center flex-col  items-center lg:w-1/3">
          <div className="image rounded-full h-40 w-40 overflow-hidden ">
            <img
              src={`${server_url}/uploads/${loggedUserData.profilePicture}`}
              alt={loggedUserData.profilePicture}
            />
          </div>

          <div className="details flex flex-col gap-2 text-gray-600 mt-3">
            <h1 className="text-xl fw-medium">
              <i class=" me-2  fa-solid fa-user"></i>
              {loggedUserData.name}
            </h1>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-phone"></i>
              {loggedUserData.phone}
            </p>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-envelope"></i>
              {loggedUserData.email}
            </p>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-location-crosshairs"></i>
              {loggedUserData.address}
            </p>
            <p>
              <i class="me-2 text-gray-700 fa-solid fa-location-dot"></i>
              {loggedUserData.location}
            </p>
            <div className="btns">
              <button className="px-3 py-1 rounded-lg text-white fw-medium   me-3 w-32 hover:border-green-500 hover:text-green-500 bg-green-500">
                Edit
              </button>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-lg text-white fw-medium   me-3 w-32 hover:border-blue-500 hover:text-blue-500 bg-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <span className=" w-1 bg-gray-500"></span>
        <div className="current-plan lg:w-2/3  flex items-start flex-col gap-3   ps-5">
          <h1 className="lg:text-2xl sm:text-xl fw-medium text-uppercase bg-gray-100 px-3 py-1">
            Current SubScription plan Details
          </h1>
          <div className="flex flex-col gap-2 fw-semibold text-gray-600">
            <p>Mess Name:Foody Hub</p>
            <p>Location:Kochi</p>
            <p>Price:20000/-</p>
            <h5 className="text-xl text-gray-700">
              Current Plan is Ends In{" "}
              <span className="rounded text-red-500 text-4xl mx-1">08</span>Days
            </h5>
          </div>

          <button
            onClick={() => navigate("/myOrders")}
            className="bg-slate-800 mt-5 rounded-lg px-5 fw-medium text-white py-2"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
