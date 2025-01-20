import React, { useState, useEffect } from "react";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { server_url } from "../services/server_url";
import { getMessData, subcriptionFunction } from "../services/all_API";
subcriptionFunction
const MessDetails = () => {
  const [messData, setMessData] = useState(null);
  const navigate=useNavigate()
  // const [messId, setMessId] = useState(null);
  const { id } = useParams();
  const fetchMessData = async () => {
    try {
      const result = await getMessData({ messId:id });
      setMessData(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // setMessId(id);

    fetchMessData();
  }, []);

  const handleSubscribe = async(plan) => {
    const {name,details,price,duration}=plan;
    const messId=id;
    const messName=messData.messName;
    const userId=sessionStorage.getItem('userId')
    const reqBody={
      name,details,price,duration,messName,messId,userId
    }
    const result=await subcriptionFunction(reqBody)
    if (result.status==200) {
      window.location.href = result.data;
    } else {
      console.log(result.response.data);
    }
  };

  if (!messData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center bg-gray-200 p-6">
          <img
          src={`${server_url}/uploads/${messData.messImage}`}
            alt="Mess"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {messData.messName}
            </h2>
            <p className="text-gray-600">{messData.messDescription}</p>
            <p className="text-gray-600">
              📍 {messData.address}, {messData.location}
            </p>
            <p className="text-gray-600">
              📞 {messData.phoneNumber} | ✉️ {messData.emailAddress}
            </p>
          </div>
        </div>

        {/* Weekly Menu */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Menu</h3>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Day</th>
                <th className="border border-gray-300 px-4 py-2">Breakfast</th>
                <th className="border border-gray-300 px-4 py-2">Lunch</th>
                <th className="border border-gray-300 px-4 py-2">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {messData.weeklyMenu.map((menu, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.day}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.breakfast}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.lunch}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {menu.dinner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subscription Plans */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Subscription Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messData.subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white text-center"
              >
                <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
                <p className="text-gray-600">{plan.details}</p>
                <p className="text-gray-800 font-semibold">💰 ₹{plan.price}</p>
                <p className="text-gray-600">{plan.duration}</p>
                <button
                  onClick={() => handleSubscribe(plan)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessDetails;

// import React, { useContext } from "react";
// import { assets } from "../assets/assets";
// import { useParams } from "react-router-dom";
// import { MessContext } from "../context/messContext";

// function MessDetails() {
//   // const mess = {
//   //   Name: "Tasty Bites Food Mess",
//   //   Location: "Downtown, Kochi",
//   //   CuisineType: ["South Indian", "North Indian", "Chinese"],
//   //   Capacity: 50,
//   //   MonthlySubscription: {
//   //     Vegetarian: 3500,
//   //     NonVegetarian: 4500,
//   //   },
//   //   Timings: {
//   //     Breakfast: "7:00 AM - 9:00 AM",
//   //     Lunch: "12:00 PM - 2:00 PM",
//   //     Dinner: "7:00 PM - 9:00 PM",
//   //   },
//   //   Specialties: [
//   //     "Homemade taste",
//   //     "Daily menu variety",
//   //     "Hygienic food preparation",
//   //   ],
//   //   Contact: {
//   //     Phone: "+91 9876543210",
//   //     Email: "contact@tastybites.com",
//   //   },
//   //   Rating: 4.5,
//   //   Reviews: [
//   //     "Delicious food with great variety.",
//   //     "Affordable prices and clean environment.",
//   //     "Friendly staff and punctual delivery.",
//   //   ],
//   // };
//   const mess = {
//     name: "Arya Bhavan",
//     description:
//       "At LunchLoom, we believe that good food is the foundation of a happy life. Our mess service is designed to provide you with healthy, wholesome, and delicious meals that feel just like home. Whether you're a student, a working professional, or anyone looking for convenient and affordable food options, LunchLoom Mess is here to cater to your needs.We take pride in using fresh, locally sourced ingredients to prepare a wide variety of dishes that suit every palate. From traditional comfort food to exciting weekly specials, our menu is crafted to keep you excited for every meal.",
//     location: "123 Main Street, Food City, FC 45678",
//     googleMapLink: "https://goo.gl/maps/example",
//     phoneNumber: "+1234567890",
//     websiteLink: "https://lunchloom.com",
//     imageUrl:
//       "https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg",
//     menu: [
//       {
//         day: "Monday",
//         meals: [
//           { type: "Breakfast", items: ["Idli", "Sambar", "Chutney"] },
//           { type: "Lunch", items: ["Rice", "Dal", "Vegetable Curry", "Salad"] },
//           { type: "Dinner", items: ["Chapati", "Paneer Masala", "Raita"] },
//         ],
//       },
//       {
//         day: "Tuesday",
//         meals: [
//           { type: "Breakfast", items: ["Poha", "Banana"] },
//           { type: "Lunch", items: ["Fried Rice", "Manchurian", "Soup"] },
//           { type: "Dinner", items: ["Noodles", "Spring Rolls"] },
//         ],
//       },
//       {
//         day: "Wednesday",
//         meals: [
//           { type: "Breakfast", items: ["Paratha", "Curd", "Pickle"] },
//           { type: "Lunch", items: ["Biryani", "Raita", "Salad"] },
//           { type: "Dinner", items: ["Dosa", "Sambar", "Coconut Chutney"] },
//         ],
//       },
//       {
//         day: "Thursday",
//         meals: [
//           { type: "Breakfast", items: ["Upma", "Coconut Chutney", "Tea"] },
//           { type: "Lunch", items: ["Chapati", "Rajma", "Mixed Veg", "Curd"] },
//           { type: "Dinner", items: ["Pulao", "Veg Curry", "Soup"] },
//         ],
//       },
//       {
//         day: "Friday",
//         meals: [
//           {
//             type: "Breakfast",
//             items: ["Bread Toast", "Butter", "Jam", "Milk"],
//           },
//           { type: "Lunch", items: ["Rice", "Sambar", "Cabbage Fry", "Pickle"] },
//           { type: "Dinner", items: ["Pasta", "Garlic Bread"] },
//         ],
//       },
//       {
//         day: "Saturday",
//         meals: [
//           { type: "Breakfast", items: ["Aloo Paratha", "Yogurt", "Pickle"] },
//           { type: "Lunch", items: ["Jeera Rice", "Chana Masala", "Salad"] },
//           {
//             type: "Dinner",
//             items: ["Paneer Butter Masala", "Naan", "Gulab Jamun"],
//           },
//         ],
//       },
//       {
//         day: "Sunday",
//         meals: [
//           { type: "Breakfast", items: ["Masala Dosa", "Sambar", "Chutney"] },
//           {
//             type: "Lunch",
//             items: ["Veg Pulao", "Dal Tadka", "Papad", "Sweet"],
//           },
//           { type: "Dinner", items: ["Pizza", "Cold Drink", "Ice Cream"] },
//         ],
//       },
//     ],
//     subscriptionPlans: [
//       {
//         type: "Weekly",
//         price: 1200,
//         details: "Includes breakfast, lunch, and dinner for 7 days.",
//       },
//       {
//         type: "Monthly",
//         price: 4500,
//         details: "Includes breakfast, lunch, and dinner for 30 days.",
//       },
//       {
//         type: "Yearly",
//         price: 50000,
//         details: "Includes breakfast, lunch, and dinner for 365 days.",
//       },
//     ],
//   };
//   const { messes } = useContext(MessContext);
//   const { id } = useParams();

//   const abc = messes.filter((mess) => mess.id == id);

//   return (
//     <>
//       <div className="shadow-lg mt-32 m-10  rounded-lg d-flex lg:flex-row flex-col py-10 px-10 items-center justify-between lg:justify-start ">
//         <div className="w-96 h-80 rounded-md bg-cover"style={{ backgroundImage: `url(${assets.hotel})` }}>
//           {/* <img src={assets.hotel} className="h-28 " alt="hotel image"  /> */}
//         </div>
//         <div className="py-5 md:px-5 text-slate-500 flex flex-col gap-2 lg:w-3/4">
//           <h1 className="lg:text-4xl text-2xl font-medium text-slate-600">
//             {abc[0].messName}
//           </h1>
//           <p className="w-100 text-wrap">{mess.description}</p>
//           <p>
//             <i class="fa-solid fa-location-dot"></i> {abc[0].city}
//           </p>
//           <p>
//             <i class="fa-solid fa-phone"></i>
//             {abc[0].phone}
//           </p>
//           <p>
//             <i class="me-3 fa-solid fa-globe"></i>
//             {mess.websiteLink}
//           </p>
//         </div>
//       </div>

//       {/* Menu Details */}
//       <div className="container flex">
//         <div className=" mb-10  items-start px-5 flex flex-col ">
//           {mess.menu.map((item) => (
//             <div className="">
//               <h5 className="text-teal-500 font-medium text-2xl  p-2 ">
//                 {item.day}
//               </h5>
//               {item.meals.map((menu) => (
//                 <p className="text-gray-700 ">
//                   <span className="me-2 font-medium">{menu.type}:</span>
//                   {menu.items.map((food) => (
//                     <span className="text-gray-500 ">{food},</span>
//                   ))}
//                 </p>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div id="plans" className="flex flex-col gap-y-5">
//           {mess.subscriptionPlans.map((plan) => (
//             <div
//               className={` ${
//                 plan.type === "Weekly"
//                   ? "border-green-500"
//                   : plan.type === "Monthly"
//                   ? "border-blue-500"
//                   : "border-red-500"
//               } card `}
//             >
//               <h1
//                 className={`text-center p-3 ${
//                   plan.type === "Weekly"
//                     ? "bg-green-500"
//                     : plan.type === "Monthly"
//                     ? "bg-blue-500"
//                     : "bg-red-500"
//                 } text-white font-semibold `}
//               >
//                 {plan.type}
//               </h1>
//               <div className="p-3 gap-y-3 flex flex-col">
//                 <p>{plan.details}</p>
//                 <div className="flex justify-between">
//                   <span className="text-2xl font-medium">{plan.price}/-</span>{" "}
//                   <button
//                     className={` ${
//                       plan.type === "Weekly"
//                         ? "bg-green-500"
//                         : plan.type === "Monthly"
//                         ? "bg-blue-500"
//                         : "bg-red-500"
//                     } btn text-white`}
//                   >
//                     Subscribe Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* {mess.subscriptionPlans.map((plan) => (
//             <div>
//               <h1>{plan.type}</h1>
//               <h1>{plan.price}</h1>
//               <h1>{plan.details}</h1>
//             </div>
//           ))} */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default MessDetails;
