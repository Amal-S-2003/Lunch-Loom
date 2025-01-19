const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  messId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  messName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  subscriptionType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  startingDate: {
    type: String,
    required: true,
  },
  endingDate: {
    type: String,
    required: true,
  },
});
const subscriptions = mongoose.model("subscriptions", subscriptionSchema);
module.exports = subscriptions;
