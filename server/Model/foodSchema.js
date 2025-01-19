const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ["Vegetarian", "Non-Vegetarian", "Vegan"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  foodImage: {
    type: String,
    required: true,
   
  },
});

const foods = mongoose.model("foods", foodSchema);

module.exports = foods;
