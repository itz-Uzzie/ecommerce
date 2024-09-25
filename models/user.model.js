const mongoose = require("mongoose");
const Order = require("./order.model");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  //add address according to you need, you can add shop and delivery in address
  address: {
    country: { type: String, default: "" },
    city: { type: String, default: "" },
  },
  //array is used to store more than 1 items. (Example: USER can upload many products...)
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],//array of products
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],//array of orders
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },//single cart
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],//array of orders
});

const User = new mongoose.model("user", userSchema);
module.exports = User;
