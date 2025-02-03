import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MessContext } from "../context/MessContext";
import { getAllComment, getMessCustomers } from "../services/all_api";
import { server_url } from "../services/server_url";

const subscriptionRates = [
  {
    type: "Weekly",
    rates: [
      { month: "January", rate: 100 },
      { month: "February", rate: 120 },
      { month: "March", rate: 110 },
      { month: "April", rate: 115 },
      { month: "May", rate: 105 },
      { month: "June", rate: 110 },
      { month: "July", rate: 120 },
      { month: "August", rate: 125 },
      { month: "September", rate: 115 },
      { month: "October", rate: 110 },
      { month: "November", rate: 120 },
      { month: "December", rate: 125 },
    ],
  },
  {
    type: "Monthly",
    rates: [
      { month: "January", rate: 400 },
      { month: "February", rate: 450 },
      { month: "March", rate: 420 },
      { month: "April", rate: 430 },
      { month: "May", rate: 410 },
      { month: "June", rate: 420 },
      { month: "July", rate: 450 },
      { month: "August", rate: 460 },
      { month: "September", rate: 430 },
      { month: "October", rate: 420 },
      { month: "November", rate: 440 },
      { month: "December", rate: 460 },
    ],
  },
  {
    type: "Yearly",
    rates: [
      { month: "January", rate: 4800 },
      { month: "February", rate: 4900 },
      { month: "March", rate: 4850 },
      { month: "April", rate: 4875 },
      { month: "May", rate: 4825 },
      { month: "June", rate: 4850 },
      { month: "July", rate: 4900 },
      { month: "August", rate: 4950 },
      { month: "September", rate: 4875 },
      { month: "October", rate: 4850 },
      { month: "November", rate: 4900 },
      { month: "December", rate: 4950 },
    ],
  },
];

const MessDashboard = () => {
  const { count, setCount } = useContext(MessContext);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [allComments, setAllComments] = useState([]);
  const messId = sessionStorage.getItem("messId");

  const fetchMessCustomers = async () => {
    const result = await getMessCustomers({ messId });
    const subscriptions = result.data;

    getTotalRevenue(subscriptions);
  };
  const getTotalRevenue = (subscriptions) => {
    console.log("2");
    console.log(subscriptions);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based index (January = 0)
    const currentYear = currentDate.getFullYear();
    const total = subscriptions
      .filter((sub) => {
        const subDate = new Date(sub.startingDate); // Convert string to Date
        if (isNaN(subDate)) {
          console.error(`Invalid date: ${sub.startingDate}`);
          return false;
        }
        return (
          subDate.getMonth() === currentMonth &&
          subDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, sub) => sum + sub.price, 0);
    const totalIncome = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

    setTotalRevenue(total);
    setTotalIncome(totalIncome);
    const activeUsers = subscriptions.filter((sub) => {
      const startDate = new Date(sub.startingDate);
      const endDate = new Date(sub.endingDate);

      return startDate <= currentDate && currentDate <= endDate; // Active if current date is within range
    }).length;
    setActiveUsersCount(activeUsers);
  };

  const fetchAllComments = async () => {
    const result = await getAllComment({ messId });
    if (result.status == 200) {
      setAllComments(result.data);
    } else {
      console.log(result);
    }
    console.log("allComments", allComments);
  };
  // Combine data for all subscription types
  // const combinedData = subscriptionRates[0].rates.map((item, index) => ({
  //   month: item.month,
  //   Weekly: subscriptionRates[0].rates[index].rate,
  //   Monthly: subscriptionRates[1].rates[index].rate,
  //   Yearly: subscriptionRates[2].rates[index].rate,
  // }));
  useEffect(() => {
    fetchMessCustomers();
    fetchAllComments();
  }, [messId]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap gap-3 justify-between m-5">
        <div className="card shadow rounded-lg lg:w-1/4 sm:w-100 text-center px-5 py-3 bg-gray-50">
          <h2 className="text-xl text-gray-600">Active Customers</h2>
          <h1 className="text-4xl font-bold text-teal-600">
            {activeUsersCount}
          </h1>
        </div>
        <div className="card shadow rounded-lg lg:w-1/4 sm:w-100 text-center px-5 py-3 bg-gray-50">
          <h2 className="text-2xl text-gray-600">This Month Revenue</h2>
          <h1 className="text-4xl font-bold text-teal-600">₹{totalRevenue}</h1>
        </div>
        <div className="card shadow rounded-lg lg:w-1/4 sm:w-100 text-center px-5 py-3 bg-gray-50">
          <h2 className="text-2xl text-gray-600">Total Income</h2>
          <h1 className="text-4xl font-bold text-teal-600">₹{totalIncome}</h1>
        </div>
      </div>
      <hr />
      {/* User Responses */}
      <div className="flex flex-col gap-3 m-5">
        <h1 className="text-4xl text-decoration-underline text-teal-600 fw-bold text-center">
          User Responses{" "}
        </h1>
        {
          allComments?.length>0?
        
        <div>
          {allComments.map((comment, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <img
                src={`${server_url}/uploads/${comment.profilePicture}`}
                alt={comment.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {comment.name}
                  </h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="mt-2 text-gray-700">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>:
        <div>
<p className="text-center text-2xl">No User Resposes are available!</p>
        </div>}
      </div>


    </div>
  );
};

export default MessDashboard;
