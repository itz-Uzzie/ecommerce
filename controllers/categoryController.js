const Category = require("../models/category.model");

//creating category isn't accessible to anyone, only you can create a category
const addCategory = async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.send("category created successfully");
    console.log("Category Added successfuly", result);
  } catch (error) {
    console.log("Error while adding category");
  }
};
//display all categories
const allCategories = async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).send(data);
    console.log(data);
  } catch (error) {
    console.log("error getting category");
  }
};
//it works as a product filter by category
//you can also transfer it to product routes
const CategoryFilter = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data = await Category.findOne({ _id: categoryId }).populate(
      "products"
    );
    if (!data.products.length > 0) {
      return res.status(400).send("no any products available in this category");
    }
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.log("Error while getting single category info", error);
  }
};

module.exports = { addCategory, allCategories, CategoryFilter };
