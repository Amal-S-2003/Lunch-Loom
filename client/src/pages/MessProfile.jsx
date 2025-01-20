import React, { useEffect, useState } from "react";
import { getMessData } from "../services/all_api";
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
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Mess Image */}
        <img
          src={
            messData.messImage
              ? `${server_url}/uploads/${messData.messImage}`
              : "https://via.placeholder.com/800x400?text=Mess+Image"
          }
          alt={`${messData.messName || "Mess"} Image`}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Mess Name */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{messData.messName || "Mess Name"}</h1>
          <p className="text-gray-600 text-sm mb-4">Located in: {messData.location || "Location"}</p>

          {/* Description */}
          <p className="mt-4 text-gray-700 leading-relaxed">{messData.messDescription || "No description available."}</p>

          {/* Home Delivery Badge */}
          {messData.homeDelivery && (
            <div className="mt-4 inline-flex items-center bg-green-100 text-green-600 text-sm font-medium py-1 px-3 rounded-full">
              <span className="text-lg">\u2714</span>
              <span className="ml-2">Home Delivery Available</span>
            </div>
          )}

          {/* Contact Details */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Phone:</span>
              <span className="ml-2 text-gray-800">{messData.phoneNumber || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="ml-2 text-gray-800">{messData.emailAddress || "N/A"}</span>
            </div>
            <div className="flex items-center sm:col-span-2">
              <span className="text-gray-600 font-medium">Address:</span>
              <span className="ml-2 text-gray-800">{messData.address || "N/A"}</span>
            </div>
          </div>

          {/* Google Map Link */}
          {messData.googleMapLink && (
            <div className="mt-6">
              <a
                href={messData.googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-500 underline hover:text-blue-700"
              >
                View Location on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessProfile;
