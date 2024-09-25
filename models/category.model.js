const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],//each category have many products
});

const Category = new mongoose.model("category", categorySchema);
module.exports = Category;
