// Import Cart and Product models
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Controller function to add a product to the user's cart
const addtoCart = async (req, res) => {
  try {
    const user_id = req.params.id;
    // Get the product ID and quantity from the request body, quantity is optional
    const { product_id, quantity } = req.body;

    // Find the product by its ID to get its price
    let product = await Product.findById(product_id);
    let productprice = product.price;

    // Check if the user already has a cart
    let cart = await Cart.findOne({ owner: user_id });
    const totalprice = productprice * (quantity || 1); // Calculate total price, default quantity is 1

    // If the user doesn't have a cart, create one with the new product
    if (!cart) {
      cart = new Cart({
        products: [{ product: product_id, quantity, totalprice }], // Add product with quantity and total price
        owner: user_id, // Set the user as the cart owner
        grandtotal: totalprice, // Set the initial grand total
      });
    } else {
      // Check if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === product_id
      );
      // If product is already in the cart, send a message
      if (productIndex > -1) {
        res.send("Product is already in the cart");
      } else {
        // If product is not in the cart, add it and update the grand total
        cart.products.push({ product: product_id, quantity, totalprice });
        cart.grandtotal += totalprice;
      }
    }
    // Save the cart and send a success message with the updated cart
    await cart.save();
    res.status(200).send({ msg: "Product added to cart", cart });
    console.log(cart);
  } catch (error) {
    console.log("Error while adding to cart");
    res.status(500).send("error while adding to cart");
  }
};

// Controller function to update the cart (changing quantity or removing products)
const updateCart = async (req, res) => {
  try {
    const user_id = req.params.id;
    // Get the product ID and new quantity from the request body
    const { product_id, quantity } = req.body;

    // Find the product to get its price
    const product = await Product.findById(product_id);
    const productprice = product.price;

    // Find the user's cart
    let cart = await Cart.findOne({ owner: user_id });
    // If the cart doesn't exist, return an error
    if (!cart) {
      return res.status(404).send("Cart is empty");
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === product_id
    );
    // If the product is not found in the cart, return an error
    if (productIndex === -1) {
      return res.status(404).send("Product not found in cart");
    }

    // If the quantity is less than or equal to 0, remove the product from the cart
    if (quantity <= 0) {
      const removedProduct = cart.products[productIndex];
      cart.grandtotal -= removedProduct.totalprice; // Update the grand total
      cart.products.splice(productIndex, 1); // Remove the product from the cart
    }

    // Calculate the old and new total price for the product
    oldTotalPrice = cart.products[productIndex].totalprice;
    newTotalPrice = productprice * quantity;

    // Update the product's quantity and total price in the cart
    cart.products[productIndex].quantity = quantity;
    cart.products[productIndex].totalprice = newTotalPrice;

    // Update the grand total by adjusting the old price with the new one
    cart.grandtotal = cart.grandtotal + newTotalPrice - oldTotalPrice;

    // Save the updated cart and send a success message
    await cart.save();
    res.status(200).send({ msg: "Cart updated", cart });
    console.log(cart);
  } catch (error) {
    console.log("Error while updating cart", error);
    res.status(500).send("Error while updating cart");
  }
};

// Controller function to show the user's cart with product details
const showCart = async (req, res) => {
  try {
    const userid = req.params.id;
    // Find the user's cart and populate the product details (name, price, description)
    const data = await Cart.findOne({ owner: userid }).populate({
      path: "products.product",
      select: "name price description",
    });
    // Send the cart data as a response
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    console.log("Error while getting data in showCart", error);
  }
};

// Export the controller functions so they can be used in routes
module.exports = { addtoCart, showCart, updateCart };
