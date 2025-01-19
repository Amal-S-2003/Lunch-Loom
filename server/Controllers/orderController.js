const orders = require("../Model/orderSchema");

exports.placeOrder = async (req, res) => {
  const { userId, name, phone, address, paymentMethod, cartItems, totalPrice } =
    req.body;
  const newOrder = new orders({
    userId,
    name,
    phone,
    address,
    paymentMethod,
    cartItems,
    totalPrice,
  });
 await newOrder.save();

  res.status(200).json("Order SuccessFull");
};

exports.getUserOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const userOrders = await orders.find({ userId });
    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }
    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await orders.find();
    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
    res.status(401).json("Cannot find the orders");
  }
};

exports.updateOrderStatus = async (req, res) => {
  
  const { orderId, newStatus } = req.body;

  try {
    const order = await orders.findByIdAndUpdate(orderId, {
      deliveryStatus: newStatus,
    });
    res.status(200).json("Order status Updated!!!");
  } catch (error) {
    console.log(error);
    res.status(401).json("Cannot Update the order status");
  }
};
