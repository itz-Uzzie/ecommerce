const mongoose = require("mongoose");
const Category = require("./category.model");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },//owner of the product
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },//which category of product
});

const Product = new mongoose.model("product", productSchema);
module.exports = Product;
