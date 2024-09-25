const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  //in products array we add product reference quantity of product and total price of each product
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
      totalprice: { type: Number, default: 0 },
    },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },//each cart is of a single user
  grandtotal: { type: Number, default: 0 },//total price of all products
});

const Cart = new mongoose.model("cart", cartSchema);
module.exports = Cart;
