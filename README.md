If You want to read the code here's a tip use flow of code
FLOW : Models-->  db.js -->  server.js -->  Routes -->  Controllers

IF YOU WANT TO CREATE BY YOURSELF HERE ARE SOME STEPS THAT HELPS YOU TO MAKE IT EASY
1. Check all models
2. Create db.js
3. Connect backend with mongoose
4. Define all routes path
5. Define sub routes
6. Create logic for all routes

IF YOU WANT TO CREATE YOUR FRONTEND WITH THIS BACKEND ALL ROUTES ARE BELOW THAT HELPS YOU TO SEND YOUR REQUEST FROM FRONTEND
//All routes and their parameters that are required
**User Routes** :
          (1. Sign Up
          Route: POST /api/user/create
          Body: { name, email, password }
          Params: null
          Description: Creates a new user account. 2. Login
          Route: POST /api/user/login
          Body: { email, password }
          Params: null
          Description: Authenticates a user and returns user information. 3. Update Password
          Route: PATCH /api/user/password/:id
          Body: { password }
          Params: { id: userId }
          Description: Updates the password for a specific user. 4. Delete Account
          Route: DELETE /api/user/remove/:id
          Body: null
          Params: { id: userId }
          Description: Deletes the user account. 5. Add or Update Address
          Route: PATCH /api/user/newaddress/:id
          Body: { country, city }
          Params: { id: userId }
          Description: Adds or updates the user's address. 6. User Products
          Route: GET /api/user/myproducts/:id
          Body: null
          Params: { id: userId }
          Description: Retrieves all products uploaded by the user.)
**Product Routes** :
          ( 1. Create Product
          Route: POST /api/product/create
          Body: { name, price, description, categoryId, userId }
          Params: null
          Description: Creates a new product in the system. 2. Delete Product
          Route: DELETE /api/product/remove/:id
          Body: null
          Params: { id: productId }
          Description: Deletes a specific product by ID. 3. Get All Products
          Route: GET /api/product/allproducts
          Body: null
          Params: null
          Description: Retrieves all products for the homepage. 4. Update Product
          Route: PATCH /api/product/edit/:id
          Body: { name, price, description, category (optional) }
          Params: { id: productId }
          Description: Updates the details of a specific product.)
**Cart Routes** :
          ( 1. Add to Cart
          Route: POST /api/cart/addtocart/:id
          Body: { product_id, quantity (optional) }
          Params: { id: userId }
          Description: Adds a product to the user's cart. 2. View Cart
          Route: GET /api/cart/mycart/:id
          Body: null
          Params: { id: userId }
          Description: Retrieves the user's current cart. 3. Update Cart
          Route: PATCH /api/cart/update/:id
          Body: { product_id, quantity }
          Params: { id: userId }
          Description: Updates the quantity of a product in the user's cart.)
**Order Routes** :
          ( 1. Place Order
          Route: POST /api/order/placeorder/:id
          Body: null
          Params: { id: userId }
          Description: Places an order with the items in the user's cart. 2. User Orders
          Route: GET /api/order/userorder/:id
          Body: null
          Params: { id: userId }
          Description: Retrieves all orders placed by a user.)
**Category Routes** :
          ( 1. Add Category
          Route: POST /api/category/create
          Body: { name }
          Params: null
          Description: Adds a new product category. (Not for frontend use) 2. Get All Categories
          Route: GET /api/category/all
          Body: null
          Params: null
          Description: Retrieves all categories. 3. Filter Products by Category
          Route: GET /api/category/:id
          Body: null
          Params: { id: categoryId }
          Description: Retrieves all products under a specific category.)
