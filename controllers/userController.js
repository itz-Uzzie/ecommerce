const User = require("../models/user.model");

// Function to sign up a new user
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Create a new user in the database
    const userCreated = await User.create({
      name,
      email,
      password,
    });
    // Send success message and the newly created user
    res.status(201).send({ msg: "User has been created", userCreated });
    console.log(userCreated);
  } catch (error) {
    console.log("Error while creating user", error);
  }
};

// Function to sign in a user
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });// Find user by email

    // If email is not registered, send a message
    if (!user) {
      return res.status(404).send("Email is not registered");
    }

    // Check if password matches the one in the database
    if (user.password !== password) {
      return res.status(400).send("Invalid password");
    } else {
      // If credentials are correct, send success message and user info
      res.status(200).json({ msg: "Login Successful", user });
      console.log("Login Successful", user.email, user.password);
    }
  } catch (error) {
    console.log("Error while signing in", error);
  }
};

// Function to update a user's password
const updatePassword = async (req, res) => {
  try {
    // Get the new password from the request body and user ID from the params
    const { password } = req.body;
    const userid = req.params.id;

    // Update the user's password in the database
    const updatedPassword = await User.findByIdAndUpdate(userid, {
      password: password,
    });

    console.log(updatedPassword);

    // Send success message
    res.status(200).send("Password changed successfully");
  } catch (error) {
    console.log("Error in updating password", error);
    res.status(500).send("Server error while updating password");
  }
};

// Function to remove a user from the database
const removeUser = async (req, res) => {
  try {
    // Delete user by ID from the request params
    const result = User.findByIdAndDelete(req.params.id);
    console.log("Deletion Successful");

    // Send success message
    res.send("Deletion successful");
  } catch (error) {
    console.log("Error while deleting User", error);
  }
};

// Function to get all products owned by a user
const userProducts = async (req, res) => {
  try {
    const userid = req.params.id;
    // Find the user and populate their products
    const userproducts = await User.findById(userid)
      .populate({
        path: "products",
        select: "name price description",
      })
      .select("products");

    // Send the user's products as the response
    res.json(userproducts);
    console.log(userproducts);
  } catch (error) {
    console.log("Error while getting user products", error);
  }
};

// Function to add or update a user's address
const addAddress = async (req, res) => {
  try {
    // Get user ID from the request params and address from the request body
    const userid = req.params.id;
    const { country, city } = req.body;

    // Update the user's address in the database
    const updatedAddress = await User.findByIdAndUpdate(
      userid,
      { address: { country, city } },
      { new: true }
    );

    // If user is not found, send an error message
    if (!updatedAddress) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send the updated address as the response
    res.status(200).send(updatedAddress);
    console.log(updatedAddress);
  } catch (error) {
    console.log("Error while adding your address", error);
  }
};

// Exporting the functions
module.exports = {
  signup,
  signIn,
  updatePassword,
  removeUser,
  userProducts,
  addAddress,
};
