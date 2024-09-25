const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/create").post(productController.create); //create a new product
router.route("/remove/:id").delete(productController.removeProduct); //remove product
router.route("/allproducts").get(productController.viewdata); //get all products for homepage
router.route("/edit/:id").patch(productController.updateProduct); //update product details
module.exports = router;
