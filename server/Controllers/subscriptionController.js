
// ========================================================

const subscriptions = require("../Model/subscriptionSchema");
const stripe = require("stripe")(process.env.stripe_secret_key);

exports.initiateSubscription = async (req, res) => {
  const { name, details, price, duration, messName, messId, userId } = req.body;

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
    success_url: `http://localhost:5173/success`,
    cancel_url: "http://localhost:5173/cancel",
  });
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
    userId,
    startingDate,
    endingDate,
  });
  await newSubscription.save();
  res.status(200).json(session.url);
};

exports.subscriptionController=async(req,res)=>{
const {userId}=req.body;

try { 
    const userSubscriptions = await subscriptions.find({ userId });
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
}


exports.getMessCustomers=async(req,res)=>{
  const {messId}=req.body;
  
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
  }
exports.deleteLast = async (req,res) => {
  console.log("deleteLast");
  
  try {
    const deletedDocument = await subscriptions.findOneAndDelete({}, { sort: { createdAt: -1 } });
    if (deletedDocument) {
      console.log("Deleted Document:", deletedDocument);
    } else {
      console.log("No documents found to delete.");
    }
  } catch (error) {
    console.error("Error deleting the last document:", error);
  }
};