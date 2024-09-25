const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

router.route("/placeorder/:id").post(OrderController.placeOrder); //place order that is in cart
router.route("/userorder/:id").get(OrderController.userOrders); //see orders by a user

module.exports = router;
