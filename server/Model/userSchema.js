const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  history: {
    type: Array,
  },
  currentPlan: {
    type: Object,
    required: true,
    default:{}
  },

  cart: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      foodName: {
        type: String,
      },
      foodImage: {
        type: String,
      },
      price: {
        type: Number,
      },
      qty: { type: Number, default: 1 },
    },
  ],
  myOrders:{
    type:Array
  }
});
const users = mongoose.model("users", userSchema);
module.exports = users;
