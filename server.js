const connectDB = require("./db");
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");

//initialize the app
const app = express();
app.use(express.json());

//all routes here
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

//connection with backend
connectDB().then(() => {
  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
});
