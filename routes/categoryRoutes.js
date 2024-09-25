const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.route("/create").post(categoryController.addCategory); //add new category not for frontend
router.route("/all").get(categoryController.allCategories); //get all categories
router.route("/:id").get(categoryController.CategoryFilter); //products in specific category
module.exports = router;
