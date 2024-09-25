const Product = require("../models/product.model");
const User = require("../models/user.model");
const Category = require("../models/category.model");

// Function to view all products
const viewdata = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json(data); // Send the product data as the response
    console.log(data);
  } catch (error) {
    console.log("something went wrong while getting data", error);
  }
};

// Function to create a new product
const create = async (req, res) => {
  try {
    // Get product details from the request body
    const { name, price, description, categoryId, userId } = req.body;
    
    // Create a new product using the provided details
    const product = new Product({
      name,
      price,
      description,
      owner: userId, // User who owns the product
      category: categoryId, // Category the product belongs to
    });
    
    // Save the product in the database
    const savedProduct = await product.save();

    // Add the product to the user's list of products
    await User.findByIdAndUpdate(userId, {
      $push: { products: savedProduct._id },
    });
    
    // Add the product to the category's list of products
    await Category.findByIdAndUpdate(categoryId, {
      $push: { products: savedProduct._id },
    });
    
    // Send success message with the saved product details
    res.status(201).send({ msg: "Product has been created", savedProduct });
    console.log(savedProduct);
  } catch (error) {
    console.log("Error adding product", error);
  }
};

// Function to remove a product
const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = Product.findById(productId);
    
    // If product is not found, send a message
    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }

    // Remove the product from the user's list of products
    await User.findByIdAndUpdate(product.owner, {
      $pull: { products: productId },
    });

    // Remove the product from the category's list of products
    await Category.findByIdAndUpdate(product.category, {
      $pull: { products: productId },
    });

    const result = await Product.findByIdAndDelete(productId);// Delete the product from the database
    console.log("Product removed successfully", result);
    
    res.send(result);// Send the result as the response
  } catch (error) {
    res.status(500).send({ msg: "Error in removing Product", error });
    console.log("Error while Removing product", error);
  }
};

// Function to update a product's details
const updateProduct = async (req, res) => {
  try {
    // Get the product ID from the request parameters
    const productid = req.params.id;
    const { category } = req.body; //if category is changed then we need category otherwise product detail can be change directly by sending anything that need to be replaced

    // Find the product by its ID
    const product = await Product.findById(productid);

    // If the product is not found, send a message
    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }

    // If the category is changing, update the product's category
    if (category && category !== product.category.toString()) {
      // Remove the product from the old category
      await Category.findByIdAndUpdate(product.category, {
        $pull: { products: productid },
      });

      // Add the product to the new category
      await Category.findByIdAndUpdate(category, {
        $push: { products: productid },
      });
    }

    // Update the product with new details
    const updatedProduct = await Product.findByIdAndUpdate(
      productid,
      req.body,
      { new: true } // Return the updated product
    );

    console.log("Product updated successfully", updatedProduct);
    
    // Send success message with updated product details
    res
      .status(200)
      .send({ msg: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.log("Error while updating Product");
  }
};

// Export the functions
module.exports = { create, removeProduct, viewdata, updateProduct };
