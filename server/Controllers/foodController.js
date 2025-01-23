const foods = require("../Model/foodSchema");
const users = require("../Model/userSchema");

exports.getAllFoods = async (req, res) => {
  try {
    const result = await foods.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.addToCart = async (req, res) => {
  try {

    const { userId, foodId, foodImage, price, foodName } = req.body;

    const user = await users.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.foodId.toString() === foodId
    );

    if (cartItem) {
      cartItem.qty += 1;
    } else {
      user.cart.push({ foodId, foodImage, price, foodName, qty: 1 });
    }

    await user.save();

    res.status(200).json({ message: "Item Added To Cart", cart: user.cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getCartDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch the user and populate the foodId in the cart array
    const user = await users.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.updateCart = async (req, res) => {
  const { userId, cartItems } = req.body;
  const user = await users.findOneAndUpdate(
    { _id: userId },
    { cart: cartItems }
  );
  res.status(200).json("Cart updated");
};

exports.addFood = async (req, res) => {
  const {  foodName, description, type, price } = req.body;
  const foodImage = req.file.filename;

  try{

  
  const newFood = new foods({
    foodImage,
    foodName,
    description,
    type,
    price
  });
  await newFood.save();
  res.status(200).json("Food Added SuccessFully");
}catch(error){
  console.log(error);
  
  res.status(401).json("Food Adding Failed");

}
};
 

exports.getFoodDeatils = async (req, res) => {
  const { foodId } = req.body;
  try {
    const result = await foods.find({ _id: foodId });
    res.status(200).json(result);
    
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

exports.updateFood = async (req, res) => {
  const { foodId,foodName, description, type, price } = req.body;
  const foodImage = req?.file?.filename;
  try {
    if (foodImage == undefined) {
      await foods.findByIdAndUpdate(foodId, {
        foodName, description, type, price
      });
    } else {
      await foods.findByIdAndUpdate(foodId, {
        foodName, description, type, price,
        foodImage,
      });
    }
    res.status(200).json("Food Updated SuccessFully");
  } catch (err) {
    res.status(401).json(err);
  }
};
