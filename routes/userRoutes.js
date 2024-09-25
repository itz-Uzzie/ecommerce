const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/create").post(userController.signup); //signup a new user
router.route("/login").post(userController.signIn); //signin user
router.route("/password/:id").patch(userController.updatePassword); //update password
router.route("/remove/:id").delete(userController.removeUser); //delete your account
router.route("/newaddress/:id").patch(userController.addAddress); //add or update address
router.route("/myproducts/:id").get(userController.userProducts); //products uploaded by user
module.exports = router;
