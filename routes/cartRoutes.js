const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.route("/addtocart/:id").post(cartController.addtoCart); //add a product to cart
router.route("/mycart/:id").get(cartController.showCart); //check user cart
router.route("/update/:id").patch(cartController.updateCart); //add or subtract items from cart
module.exports = router;
