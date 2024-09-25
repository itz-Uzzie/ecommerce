const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

// Function to place an order for a user by moving products from the user's cart to a new order
const placeOrder = async (req, res) => {
  try {
    const current_user = await req.params.id;
    const user = await User.findById(current_user);
    
    // Construct the address for the order from the user's details
    const address = `${user.address.country} ${user.address.city}`;
    
    // Find the user's cart and populate product details (name, price)
    const cart = await Cart.findOne({ owner: current_user }).populate(
      "products.product",
      "name price"
    );
    
    // If the cart is empty, send a response indicating no products
    if (!cart || cart.products.length === 0) {
      res.status(404).send("Cart is empty");
    }

    // Prepare the products for the new order by mapping over the cart items
    const productsForOrder = cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      totalprice: item.totalprice,
    }));

    // Create a new order using the address, products, and grand total from the cart
    const newOrder = await Order.create({
      address,
      products: productsForOrder,
      grandtotal: cart.grandtotal,
    });

    // Update the user's orders by adding the new order's ID
    const updatedUser = await User.findByIdAndUpdate(
      current_user,
      { $push: { orders: newOrder._id } },
      { new: true }
    );
    
    // Clear the cart by removing all products and resetting the grand total
    const updatedcart = await Cart.findOneAndUpdate(
      { owner: current_user },
      { $set: { products: [], grandtotal: 0 } },
      { new: true }
    );

    // Send a success response with the placed order details
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
    console.log("Order placed:", newOrder);
  } catch (error) {
    console.log("error occur while placing order");
    res.status(500).json({ message: "Error occurred while placing order" });
  }
};

// Function to retrieve all orders placed by a user
const userOrders = async (req, res) => {
  try {
    // Find the user by ID and populate the order details (address, products, total prices)
    const data = await User.findById(req.params.id)
      .populate({
        path: "orders",
        select: "address products totalprice grandtotal",
      })
      .select("orders");

    // If no orders are found, send a response indicating no orders
    if (!data) {
      res.send("No orders available yet");
      console.log("No orders available yet");
    }

    // Send the user's order data as a response
    res.status(200).json(data);
  } catch (error) {
    console.log("Error while searching for data", error);
    res.send("something went wrong");
  }
};

// Export the placeOrder and userOrders functions
module.exports = { placeOrder, userOrders };
