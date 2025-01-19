import React, { useState } from "react";
import { AddToCart } from "../services/all_api";
import { toast, ToastContainer } from "react-toastify";

function FoodCard({ food }) {
 
  const handleCart = async (food) => {
    const userId = sessionStorage.getItem("userId");
    const reqBody = {
      userId,
      foodId:food._id,
      foodImage:food.foodImage,
      price:food.price,
      foodName:food.foodName,
    };
    const result = await AddToCart(reqBody);
    console.log(result);
    
    if (result.status==200) {
      toast.success(result.data.message);
    }
    console.log(result);
  };
  return (
    <div>
      <div
        className="card shadow rounded-lg p-4  w-60  flex flex-col gap-3"
        style={{ minHeight: "450px" }}
      >
        <img
          src={food.foodImage}
          alt=""
          className="hover:scale-105 transition"
        />
        <span className="w-100 h-1 border-2  rounded border-gray-500"></span>
        <div className="flex flex-col gap-3 text-gray-700">
          <h1>{food.foodName}</h1>
          <p>{food.description}</p>
          <p>Type:{food.type}</p>
          <p>Ratings:{food.ratings}</p>
          <b>{food.price}/-</b>
          <button
            onClick={() => handleCart(food)}
            className="bg-gray-800 text-white p-2 rounded w-32 items-start"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <ToastContainer position="top-center"/>
    </div>
  );
}

export default FoodCard;
