import React, { useEffect, useState } from "react";
import { getMessData } from "../services/all_api";

const DisplayMenu = () => {
  const [messData, setMessData] = useState({});
  const messId = sessionStorage.getItem("messId");

  const fetchMessData = async () => {
    try {
      const result = await getMessData({ messId });
      setMessData(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchMessData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mess Menu
        </h2>

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
              {messData.weeklyMenu &&
                messData.weeklyMenu.map((menu, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-700">
                      {menu.day}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{menu.breakfast}</td>
                    <td className="border border-gray-300 px-4 py-2">{menu.lunch}</td>
                    <td className="border border-gray-300 px-4 py-2">{menu.dinner}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayMenu;
