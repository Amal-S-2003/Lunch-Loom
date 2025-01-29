// ========================================================

const subscriptions = require("../Model/subscriptionSchema");
const users = require("../Model/userSchema");
const stripe = require("stripe")(process.env.stripe_secret_key);

exports.initiateSubscription = async (req, res) => {
  const {
    name,
    details,
    price,
    duration,
    messName,
    messId,
    messImage,
    userId,
    username,
    email,
    phone,
  } = req.body;
  const startingDate = new Date();
  const endingDate = new Date();

  const match = duration.match(/\d+/); // Matches one or more digits
  const number = match ? parseInt(match[0], 10) : null;
  endingDate.setDate(startingDate.getDate() + number);
  const newSubscription = new subscriptions({
    subscriptionType: name,
    details,
    price,
    duration,
    messName,
    messId,
    messImage,
    userId,
    startingDate,
    endingDate,
    username,
    email,
    phone,
  });
  await newSubscription.save();
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: messName,
              description: `Details: ${details} \n Duration: ${duration} `,
            },

            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&subscriptionId=${newSubscription._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&subscriptionId=${newSubscription._id}`,
    });
    res.status(200).json({ success: true, session_url: session.url });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: err });
  }
};

exports.verifyStripe = async (req, res) => {
  console.log("verifyStripe,verifyStripe,verifyStripe");
  const { userId, success, subscriptionId } = req.body;
  console.log(userId, success, subscriptionId, "userId,success,subscriptionId");
  try {
    if (success == "true") {
      const subDetails = await subscriptions.findByIdAndUpdate(
        { _id: subscriptionId },
        { success: "true" }
      );
      const subsrciptionData = await subscriptions.findOne({
        _id: subscriptionId,
        success: "true",
      });
      console.log("subsrciptionData", subsrciptionData);

      const userData = await users.findByIdAndUpdate(
        { _id: userId },
        { $push: { history: subsrciptionData }, currentPlan: subsrciptionData }
        // { currentPlan: subsrciptionData }
      );

      console.log("userData", userData);

      // const result = await users.findByIdAndUpdate(
      //   { _id: userId },
      //   { $push: { history: subDetails } },
      //   { new: true } // This option returns the updated document
      // );
      // console.log("result in verifyStripe", result);
      res.status(200).json("successfull");
    } else {
      const result = await users.findByIdAndDelete({ _id: subscriptionId });
      res.status(401).json("unsuccessfull");
    }
  } catch (error) {
    console.log("error", error);

    res.status(401).json("unsuccessfull");
  }
};

exports.clearCurrentPlan = async (req, res) => {
  console.log("clearCurrentPlan");
  
  const {userId}=req.body;
  console.log(userId);
  
  try {
    
    const userData = await users.findByIdAndUpdate(
      { _id: userId },
      { currentPlan: {} }
    );
    console.log(userData);
    
  } catch (error) {
    console.log(error);
    
  }
    
};
exports.getUserSubscriptions = async (req, res) => {
  const { userId } = req.body;

  try {
    const userSubscriptions = await subscriptions.find(
      { userId, success: "true" } // Query: Find documents where userId matches and success is true
    );

    if (!userSubscriptions || userSubscriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No userSubscriptions found for this user." });
    }
    res.status(200).json(userSubscriptions);
  } catch (error) {
    console.error("Error fetching userSubscriptions:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getMessCustomers = async (req, res) => {
  const { messId } = req.body;

  try {
    const customers = await subscriptions.find({ messId });
    if (!customers || customers.length === 0) {
      return res
        .status(404)
        .json({ message: "No customers found for this mess." });
    }
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Server error." });
  }
};
exports.deleteLast = async (req, res) => {
  console.log("deleteLast");

  try {
    const deletedDocument = await subscriptions.findOneAndDelete(
      {},
      { sort: { createdAt: -1 } }
    );
    if (deletedDocument) {
      console.log("Deleted Document:", deletedDocument);
    } else {
      console.log("No documents found to delete.");
    }
  } catch (error) {
    console.error("Error deleting the last document:", error);
  }
};
