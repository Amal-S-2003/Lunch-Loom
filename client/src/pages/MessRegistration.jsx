import React, { useState } from "react";
import { messRegistrationAPI } from "../services/all_api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const MessRegistrationForm = () => {
  const [formData, setFormData] = useState({
    messName: "",
    phoneNumber: "",
    emailAddress: "",
    location: "",
    address: "",
    googleMapLink: "",
    homeDelivery: false,
    messDescription: "",
    messImage: "",
    password: "",
    weeklyMenu: [
      { day: "Monday", breakfast: "", lunch: "", dinner: "" },
      { day: "Tuesday", breakfast: "", lunch: "", dinner: "" },
      { day: "Wednesday", breakfast: "", lunch: "", dinner: "" },
      { day: "Thursday", breakfast: "", lunch: "", dinner: "" },
      { day: "Friday", breakfast: "", lunch: "", dinner: "" },
      { day: "Saturday", breakfast: "", lunch: "", dinner: "" },
      { day: "Sunday", breakfast: "", lunch: "", dinner: "" },
    ],
    subscriptionPlans: [],
  });

  const [newSubscriptionPlan, setNewSubscriptionPlan] = useState({
    name: "",
    price: "",
    duration: "",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...formData.weeklyMenu];
    updatedMenu[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      weeklyMenu: updatedMenu,
    }));
  };

  const handleSubscriptionPlanChange = (e) => {
    const { name, value } = e.target;
    setNewSubscriptionPlan((prev) => ({ ...prev, [name]: value }));
  };

  const addSubscriptionPlan = () => {
    setFormData((prev) => ({
      ...prev,
      subscriptionPlans: [...prev.subscriptionPlans, newSubscriptionPlan],
    }));
    setNewSubscriptionPlan({ name: "", price: "", duration: "", details: "" });
  };
const navigate=useNavigate()
  const handleSubmit = async(e) => {
    console.log("formData",formData);
    
    e.preventDefault();
    const reqBody = formData
    const reqHeader = {
      "Content-Type": "multipart/form-data",
    };
     try {
            const result = await messRegistrationAPI(reqBody, reqHeader);
            console.log("result=> ", result);
            if (result.status == 200) {
              console.log("registerd");
             
              toast.success("Registration Successful");
              navigate("/mess-login");
            } else {
              toast.warn(result.response.data);
            }
          } catch (error) {
            toast.error(error);
          }
    console.log("Complete Data:", formData);
    alert("Mess Registered Successfully!");
  };

  return ( 
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
    <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Mess Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["messName", "phoneNumber", "emailAddress", "location", "address"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-2">
                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={`Enter ${field}`}
                className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Google Map Link</label>
            <input
              type="url"
              name="googleMapLink"
              value={formData.googleMapLink}
              onChange={handleInputChange}
              placeholder="Enter Google Map Link"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Mess Image</label>
            <input
              type="file"
              name="messImage"
              onChange={(e) =>
                setFormData({ ...formData, messImage: e.target.files[0] })
              }
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Mess Description Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mess Description</label>
            <textarea
              name="messDescription"
              value={formData.messDescription}
              onChange={handleInputChange}
              placeholder="Enter Mess Description"
              className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
              rows="4"
            />
          </div>
          {/* Home Delivery Option */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="homeDelivery"
              id="homeDelivery"
              checked={formData.homeDelivery}
              onChange={(e) =>
                setFormData({ ...formData, homeDelivery: e.target.checked })
              }
              className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="homeDelivery" className="text-gray-700 font-medium">
              Home Delivery Available
            </label>
          </div>
        </div>
  
        {/* Weekly Menu Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Weekly Menu</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="border border-gray-300 px-4 py-2 text-left">Day</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Breakfast</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Lunch</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {formData.weeklyMenu.map((menu, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-700">
                      {menu.day}
                    </td>
                    {["breakfast", "lunch", "dinner"].map((meal) => (
                      <td key={meal} className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          placeholder={`Enter ${meal}`}
                          value={menu[meal]}
                          onChange={(e) =>
                            handleMenuChange(index, meal, e.target.value)
                          }
                          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:outline-none"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* Subscription Plans Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Subscription Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["name", "price", "duration", "details"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-2">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={field === "price" ? "number" : "text"}
                  name={field}
                  value={newSubscriptionPlan[field]}
                  onChange={handleSubscriptionPlanChange}
                  placeholder={`Enter ${field}`}
                  className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSubscriptionPlan}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add Plan
          </button>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600"
        >
          Register Mess
        </button>
      </form>
    </div>
    <ToastContainer />
  </div>
  
  );
};

export default MessRegistrationForm;
