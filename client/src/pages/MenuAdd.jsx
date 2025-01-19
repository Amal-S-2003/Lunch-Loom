import React, { useState, useEffect } from "react";
import { getMessData, updateWeeklyMenu } from "../services/all_api";

const MenuAdd = () => {
  const [messData, setMessData] = useState({});
  const messId = sessionStorage.getItem("messId")
  const [weeklyMenu, setWeeklyMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMessData({messId});
        setMessData(data);
        console.log("DDAAATTTAA",data);
        
        setWeeklyMenu(data.weeklyMenu);
      } catch (error) {
        console.error("Error fetching mess data:", error);
      }
    };
    fetchData();
  }, [messId]);

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...weeklyMenu];
    updatedMenu[index][field] = value;
    setWeeklyMenu(updatedMenu);
  };

  const saveMenu = async () => {
    try {
      const newMenu={messId,weeklyMenu}
      const { data } = await updateWeeklyMenu(newMenu);
      setMessData(data);
      alert("Menu updated successfully!");
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Weekly Menu</h2>
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
              {weeklyMenu.map((menu, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{menu.day}</td>
                  {["breakfast", "lunch", "dinner"].map((meal) => (
                    <td key={meal} className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={menu[meal]}
                        onChange={(e) => handleMenuChange(index, meal, e.target.value)}
                        className="w-full p-2 border rounded-md"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={saveMenu}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Save Menu
        </button>
      </div>
    </div>
  );
};

export default MenuAdd;
