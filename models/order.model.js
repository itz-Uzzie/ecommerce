const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  address: { type: String },
  //order contains array of products where every product has its own quantity and price
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number, default: 1 },
      totalprice: { type: Number, default: 0 }, // its a price which is calculated by product price * quantity of product
    },
  ],
  grandtotal: { type: Number, required: true }, //Total of cart products
});

const Order = new mongoose.model("order", orderSchema);
module.exports = Order;
