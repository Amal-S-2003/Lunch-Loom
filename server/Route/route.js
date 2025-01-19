const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const messController = require("../Controllers/messController");
const subscriptionController = require("../Controllers/subscriptionController");
const foodController = require("../Controllers/foodController");
const orderController = require("../Controllers/orderController");
const multerConfig = require("../middleware/multerMiddleWare");
const jwtMiddleWare = require("../middleware/jwtMiddleware");

// UserLogin
router.post("/login", userController.login);

// User Register
router.post(
  "/register",
  multerConfig.single("profilePicture"),
  userController.register
);
// addNewFood
router.post(
  "/add-food",
  multerConfig.single("foodImage"),
  foodController.addFood
);

// Mess Registration
router.post(
  "/mess-register",
  multerConfig.single("messImage"),
  messController.messRegister
);

// Mess Login
router.post("/mess-login", messController.messLogin);

// Add new Mwnu from Mess
router.post("/edit-menu", jwtMiddleWare, messController.addMenu);

// Get Mess Deatils fro mess Owner
router.post("/get-mess", messController.getMessDetails);

// Get User Details
router.post("/get-user", userController.getUserDeatils);

// Updatethe menu
router.put("/update-menu", messController.updateWeeklyMenu);

// Fetch All MessData
router.get("/get-all-mess", messController.getAllMesses);

// Fetch All Foods
router.get("/get-all-foods", foodController.getAllFoods);
// Fetch All Orders
router.get("/get-all-orders", orderController.getAllOrders);
// updateOrderStatus
router.put("/update-delivery-status", orderController.updateOrderStatus);

router.put("/add-to-cart", foodController.addToCart);

router.put("/update-cart", foodController.updateCart);

router.post("/get-cart", foodController.getCartDetails);

router.post("/place-order", orderController.placeOrder);

router.post("/getUserOrders", orderController.getUserOrders);

router.delete("/delete-mess", messController.deleteMenu);

// router.post("/checkout", subscriptionController.initiateSubscription);
// router.post("/success", subscriptionController.addSubscription);

module.exports = router;
