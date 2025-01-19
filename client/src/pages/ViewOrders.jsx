import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../services/all_api';

function ViewOrders() {
    const [userId, setUserId] = useState(sessionStorage.getItem("userId")); 
    const [orders,setOrders]=useState([])
    const fetchUserOrders = async () => {
      try {
        const result = await getUserOrders({ userId });
        
        setOrders(result.data)
        setLoading(false);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  const navigate=useNavigate()
    useEffect(() => {
        fetchUserOrders();
    }, []);
  
    const [loading, setLoading] = useState(true);
  
 
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-bold">Loading...</div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>
        {orders?.length> 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-lg font-bold mb-2 text-gray-800">
                    Order ID: <span className="text-blue-600">{order._id}</span>
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <strong>Delivery Status:</strong>{" "}
                    <span
                      className={`${
                        order.deliveryStatus === "Delivered"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Total Price:</strong> ₹{order.totalPrice}
                  </p>
                  <h3 className="font-bold text-gray-800 mt-4 mb-2">
                    Ordered Items:
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    {order.cartItems.map((item) => (
                      <li key={item.foodId}>
                        {item.foodName} - ₹{item.price} x {item.qty}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
        ) : (
            <p className="text-center text-lg">No orders found.</p>
        
        )}
      </div>
    );
  }
  
  export default ViewOrders;