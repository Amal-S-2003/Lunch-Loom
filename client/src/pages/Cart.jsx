import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateCart } from "../services/all_api";

function Cart() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const fetchCartData = async () => {
    try {
      const result = await getUserData({ userId });
      setCartData(result.data[0].cart);  // Assuming `result.data[0].cart` has the cart data
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userId]);

  useEffect(() => {
    if (cartData.length > 0) {
      setCartItems(cartData);
      calculateTotalPrice(cartData);
    }
  }, [cartData]); // Recalculate when cartData changes

  // Calculate the total price of all cart items
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalPrice(total);
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (foodId, qtyChange) => {
    const updatedCart = cartItems.map((item) =>
      item.foodId === foodId
        ? { ...item, qty: Math.max(item.qty + qtyChange, 1) }
        : item
    );
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart); // Recalculate the total after updating the quantity
  };

  // Remove an item from the cart
  const removeItem = (foodId) => {
    const updatedCart = cartItems.filter((item) => item.foodId !== foodId);
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart); // Recalculate the total after removing the item
  };

  // Handle the "Proceed to Checkout" button
  const proceedToCheckout = async() => {
    const reqBody={
      userId,cartItems
    }
    const result=await updateCart(reqBody)    
    navigate("/order");
  };

  return (
    <div className="flex container">
      {cartItems?.length>0?
        <div className="mx-auto p-6 w-3/5">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {/* Cart Items */}
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.foodId}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
            >
              <img
                src={item.foodImage}
                alt={item.foodName}
                className="w-16 h-16 rounded-lg"
              />

              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.foodName}</h2>
                <p className="text-gray-500">₹{item.price}</p>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.foodId, -1)}
                  className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                >
                  -
                </button>
                <span className="px-4">{item.qty}</span>
                <button
                  onClick={() => updateQuantity(item.foodId, 1)}
                  className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.foodId)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="mt-6 bg-gray-200 p-4 rounded-lg shadow flex justify-between items-center">
          <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
          <button
            onClick={proceedToCheckout}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>:
      <div className="mx-auto flex flex-col items-center p-6 w-3/5">
        <h1 className="fw-bold text-4xl text-center mt-24">Your cart is Empty</h1>
        <button onClick={()=>navigate('/foods')} className="bg-slate-500 mt-5 rounded-lg px-5 fw-medium text-white py-2">Explore...</button>
      </div>
      }
    </div>
  );
}

export default Cart;
