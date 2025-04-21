const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Product = require("../models/Product")
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerCustomer = async (req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body;


        const existingCustomer = await Customer.findOne({email});
        console.log(existingCustomer);

        if(existingCustomer){

            return res.status(201).json({message: "Email already exist"});
        }



        const hashedPassword= await bcrypt.hash(password,10);
        const newCustomer = new Customer({name,email,password:hashedPassword,phone,address});

        await newCustomer.save();


        return res.status(201).json({
          message: "Customer registered successfully",
          customer: {
              id: newCustomer._id,
              name: newCustomer.name,
              email: newCustomer.email,
              phone: newCustomer.phone,
              address: newCustomer.address,
          },
      });

    }catch(e){

        res.status(500).json({message:"Error registering customer", error:e.message});
        

    }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const customerId = req.customer.id;

    console.log(customerId, productId);

    // Validate inputs
    if (!customerId || !productId) {
      return res.status(400).json({ message: "Customer ID and Product ID are required" });
    }

    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer || !Array.isArray(customer.wishList)) {
      return res.status(404).json({ message: "Customer not found or wishList is invalid" });
    }

    // Check if the product is already in the wishList
    const isAlreadyInwishList = customer.wishList.some(id => id.equals(productObjectId));

    console.log("wishList:", customer.wishList, "Checking Product:", productObjectId);
    
    if (isAlreadyInwishList) {
      return res.status(400).json({ message: "Product is already in wishList" });
    }

    // Add product to wishList
    customer.wishList.push(productObjectId);
    await customer.save(); // Save changes

    res.status(200).json({ message: "Product added to wishList", wishList: customer.wishList });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
exports.removeFromWishlist = async (req, res) => {
  try {
    const {itemId} = req.params;
    const customerId = req.customer.id;


    console.log(customerId, itemId);
    productId=itemId;

    // Validate inputs
    if (!customerId || !productId) {
      return res.status(400).json({ message: "Customer ID and Product ID are required" });
    }

    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer || !Array.isArray(customer.wishList)) {
      return res.status(404).json({ message: "Customer not found or wishList is invalid" });
    }

    // Check if the product is already in the wishList
    const isAlreadyInwishList = customer.wishList.some(id => id.equals(productObjectId));

    console.log("wishList:", customer.wishList, "Checking Product:", productObjectId);
    
    if (!isAlreadyInwishList) {
      return res.status(400).json({ message: "Product not found in wishList" });
    }

    // Add product to wishList
    customer.wishList.pull(productObjectId);
    await customer.save(); // Save changes

    res.status(200).json({ message: "Product removed from wishList", wishList: customer.wishList });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { productId } = req.body; // Get product ID from request body

    // Find the customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the cart
    if (customer.cart.includes(productId)) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    // Add product to cart
    customer.cart.push(productId);
    await customer.save();

    res.status(200).json({ message: "Product added to cart", cart: customer.cart });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { itemId } = req.params; // Get product ID from request body
    const productId = itemId;

    // Find the customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the cart
    if (!customer.cart.includes(productId)) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    // Add product to cart
    customer.cart.pull(productId);
    await customer.save();

    res.status(200).json({ message: "Product removed from cart", cart: customer.cart });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const customerId = req.customer.id;

    // Check if customer exists and populate wishlist with product and farmer details
    const customer = await Customer.findById(customerId)
      .populate({
        path: "wishList",
        populate: {
          path: "farmer", // Populate farmer details
          select: "name phone address", // Only get required fields
        },
      });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    console.log(customer.wishList);

    res.status(200).json({ wishList: customer.wishList });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const customerId = req.customer.id;

    // Check if customer exists and populate wishlist with product and farmer details
    const customer = await Customer.findById(customerId)
      .populate({
        path: "cart",
        populate: {
          path: "farmer", // Populate farmer details
          select: "name phone address", // Only get required fields
        },
      });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    console.log(customer.cart);

    res.status(200).json({ cart: customer.cart });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.loginCustomer = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existingCustomer = await Customer.findOne({email});
        if(!existingCustomer)
        {
          console.log("jhbdcsj");

            return res.status(201).json({message:"Invalid email or password"});
        }

        const isMatch= await bcrypt.compare(password,existingCustomer.password);
        if(!isMatch){


            return res.status(201).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id: existingCustomer._id,email:existingCustomer.email}, JWT_SECRET, {expiresIn:"1h"});
        res.json({
            message: "Login Successful",
            token,
            customer: {
                id: existingCustomer._id,
                name: existingCustomer.name,
                email: existingCustomer.email,
                phone: existingCustomer.phone,
                address: existingCustomer.address,
            },
        });
    }catch(e)
    {
        res.status(500).json({message:"Error logging in the customer", error:e.message});
    }
};


exports.getCustomerOrders = async (req, res) => {
    try {
      const customerId = req.customer.id; // Extracted from JWT authentication middleware
  
      console.log("Fetching orders for customer:", customerId);
  
      const orders = await Order.find({ customer: customerId }).populate("products.product");
  
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found for this customer" });
      }
  
      res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
      console.error("Error fetching customer orders:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


exports.updateCustomerProfile = async (req, res) => {
    try {
      const customerId = req.customer.id; // Extracted from JWT authentication middleware
      const { name,email, phone, address } = req.body;
  
      console.log("Updating profile for customer:", customerId);
  
      const customer = await Customer.findById(customerId);
  
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      if (name) customer.name = name;
      if (email) customer.email = email;
      if (phone) customer.phone = phone;
      if (address) customer.address = address;
  
      await customer.save();
  
      res.status(200).json({ message: "Customer profile updated successfully", customer });
    } catch (error) {
      console.error("Update customer profile error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// exports.getCustomerorders = async(req,res)=>{
//     try{
//         const {customerId} = req.body;
//         const orders= await Order.find({})
//     }catch(e){

//     }
// }

