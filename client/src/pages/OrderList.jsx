import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/all_api"; // Assuming you have an API to update the order status
import { toast, ToastContainer } from "react-toastify";

function OrderList() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const result = await getAllOrders();
    setOrders(result.data);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update the status in the backend
      const reqBody = {
        orderId,
        newStatus,
      };
      const result = await updateOrderStatus(reqBody);
      if (result.status == 200) {        
        toast.success(result.data);
      } else {
        toast.warn(result.data);
      }
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, deliveryStatus: newStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Could not update the order status. Please try again.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className=" mx-auto my-8 ">
      <h1 className="text-2xl font-bold text-center mb-5">Order Details</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">
                Payment Method
              </th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className="odd:bg-gray-100 even:bg-white">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.paymentMethod}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ${order.totalPrice}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-semibold">
                    <select
                      className={`w-full p-2 rounded font-semibold focus:outline-none ${
                        order.deliveryStatus === "Pending"
                          ? "text-red-500"
                          : order.deliveryStatus === "Out for Delivery"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                      value={order.deliveryStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending" className="text-red-500">
                        Pending
                      </option>
                      <option value="Out for Delivery" className="text-red-500">
                        Out for Delivery
                      </option>
                      <option value="Delivered" className="text-green-500">
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-red-500">
                  No orders found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default OrderList;
