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
  username: {
    type: String,
    required: true,
  },
  messImage: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  success:{
    type:String,
    required:true,
    default:"false"
  }
});
const subscriptions = mongoose.model("subscriptions", subscriptionSchema);
module.exports = subscriptions;
