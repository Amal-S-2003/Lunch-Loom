import React, { useContext, useEffect, useState } from "react";
import { getMessData, getMessDetails } from "../services/all_api";
import { server_url } from "../services/server_url";

const MessProfile = () => {


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
    <div className="min-h-screen  flex justify-center items-center ">
      <div className=" w-full bg-white shadow-lg  overflow-hidden">
        <img
          src={`${server_url}/uploads/${messData.messImage}`}
          alt={`${messData.messName} Image`}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          {/* Mess Name */}
          <h1 className="text-3xl font-bold text-gray-800">{messData.messName}</h1>
          <p className="text-gray-600 text-sm">Located in: {messData.location}</p>

          {/* Description */}
          <p className="mt-4 text-gray-700">{messData.messDescription}</p>

          {/* Home Delivery Badge */}
          {messData.homeDelivery && (
            <div className="mt-4 inline-flex items-center bg-green-500 text-white text-sm font-medium py-1 px-3 rounded-lg">
              <span>🏠 Home Delivery Available</span>
            </div>
          )}

          {/* Contact Details */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Phone:</span>
              <span className="text-gray-800">{messData.phoneNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{messData.emailAddress}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Address:</span>
              <span className="text-gray-800">{messData.address}</span>
            </div>
          </div>

          {/* Google Map Link */}
          <div className="mt-6">
            <a
              href={messData.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Location on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessProfile;
