const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const messController = require("../Controllers/messController");
const subscriptionController = require("../Controllers/subscriptionController");
const foodController = require("../Controllers/foodController");
const orderController = require("../Controllers/orderController");
const commentController = require("../Controllers/commentController");
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
// Update profile
router.post(
  "/updateProfile",
  multerConfig.single("profilePicture"),
  userController.updateProfile
);
// Update Mess
router.post(
  "/updateMess",
  multerConfig.single("messImage"),
  messController.updateMess
);
// update food
router.post(
  "/updateFood",
  multerConfig.single("foodImage"),
  foodController.updateFood
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

// Get Food Details
router.post("/get-food", foodController.getFoodDeatils);

// Updatethe menu
router.put("/update-menu", messController.updateWeeklyMenu);


// Fetch All MessData
router.get("/get-all-mess", messController.getAllMesses);

// Fetch All Users 
router.get("/get-all-user", userController.getAllUsers);

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
 
router.post("/add-comment", commentController.addComment);
router.post("/get-comments", commentController.getAllComments);

router.post("/getUserOrders", orderController.getUserOrders);

router.post("/getUserSubscriptions", subscriptionController.getUserSubscriptions);

router.post("/getMessCustomers", subscriptionController.getMessCustomers);

router.delete("/delete-mess", messController.deleteMenu);

router.post("/checkout", subscriptionController.initiateSubscription);

router.post("/verifyStripe",subscriptionController.verifyStripe)
router.post("/clearCurrentPlan",subscriptionController.clearCurrentPlan)

router.get("/cancelSub",subscriptionController.deleteLast) 
// router.post("/success", subscriptionController.addSubscription);

module.exports = router;
   