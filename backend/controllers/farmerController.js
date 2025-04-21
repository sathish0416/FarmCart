const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Farmer = require("../models/Farmer");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerFarmer = async(request, res) => {
    try {
        const { name, password, phone, address } = request.body;
        const existingFarmer = await Farmer.findOne({ phone });
        if (existingFarmer) {
            return res.status(201).json({ message: "User with this phone numnber already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newFarmer = new Farmer({
            name,
            password: hashedPassword,
            phone,
            address,
        });
        await newFarmer.save();
        res.status(201).json({  message: "Farmer Registered Successfully",
            farmer: {
                id: newFarmer._id,
                name: newFarmer.name,
                phone: newFarmer.phone,
                address: newFarmer.address,
            }, });
    } catch (e) {
        res.status(500).json({ message: "error registering farmer", error: e.message });
    }
}

exports.loginFarmer = async(req, res) => {
    try {
        const { phone, password } = req.body;
        const farmer = await Farmer.findOne({ phone });
        if (!farmer) {
            return res.status(200).json({ message: "Farmer not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, farmer.password);
        if (!isPasswordValid) {
            return res.status(201).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: farmer._id, phone:farmer.phone }, JWT_SECRET, { expiresIn: "1h" });
       
        res.json({
            message: "Login Successful",
            token,
            
            farmer: {
                id: farmer._id,
                name: farmer.name,
                phone: farmer.phone,
                address: farmer.address,
            },
        });

    } catch (e) {
        res.status(500).json({ message: "Error logging in farmer", error: e.message });
    }
};



exports.updateFarmerProfile = async (req, res) => {
  try {
    const farmerId = req.customer.id; // Extracted from JWT authentication middleware
    const { name,phone, address } = req.body;

    console.log("Updating profile for farmer:", farmerId);

    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    if (name) farmer.name = name;
    if (phone) farmer.phone = phone;
    if (address) farmer.address = address;

    await farmer.save();

    res.status(200).json({ message: "Farmer profile updated successfully", farmer });
  } catch (error) {
    console.error("Update farmer profile error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//Add Products

exports.viewOwnProducts = async(req, res) => {
    try {
        const farmerId = req.customer.id;
        // Assuming `req.farmer.id` is populated via JWT middleware
        const products = await Product.find({ farmer: farmerId });
        res.status(200).json({ products });

    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });

    }
};

//Add Product
exports.addProduct = async (req, res) => {
    try {
        const farmerId = req.customer.id;
        const { name, category, marketRate, price, quantity, expiryDate ,image} = req.body;

        // Validate required fields
        const missingFields = [];

if (!name) missingFields.push("name");
if (!category) missingFields.push("category");
if (!marketRate) missingFields.push("marketRate");
if (!price) missingFields.push("price");
if (!quantity) missingFields.push("quantity");
if (!expiryDate) missingFields.push("expiryDate");

if (missingFields.length > 0) {
    return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`
    });
}


        const newProduct = new Product({
            name,
            category,
            marketRate,
            price,
            quantity,
            expiryDate,
            farmer: farmerId,
            status: "Pending",
            ratings: 0,
            reviews: []
        });

        // Handle image upload (if provided)
        if (req.file) {
            newProduct.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });

    } catch (e) {
        res.status(500).json({ message: "Error adding product", error: e.message });
    }
};


//View Orders
exports.viewOrders = async (req, res) => {
    try {
        const farmerId = req.customer.id; // Get the logged-in farmer's ID

        // Fetch all orders containing at least one product from the farmer
        const orders = await Order.find({
            "products.product": { 
                $in: await Product.find({ farmer: farmerId }).select("_id")
            }
        })
        .populate("customer", "name email phone address") // Populate customer details
        .populate("products.product", "name category price farmer image"); // Populate product details
        // Filter out products that don't belong to the farmer
        const filteredOrders = orders.map(order => {
            const filteredProducts = order.products.filter(
                (item) => item.product.farmer.toString() === farmerId
            );
           console.log(filteredProducts);
            return {
                _id: order._id,
                orderId: order.orderId,
                customer: order.customer,
                status: order.status,
                totalPrice: order.totalPrice,
                products: filteredProducts, // Include only farmer's products
                createdAt: order.createdAt
            };
        }).filter(order => order.products.length > 0); // Remove orders with no relevant products

        res.status(200).json({ orders: filteredOrders });

    } catch (e) {
        res.status(500).json({ message: "Error fetching orders", error: e.message });
    }
};


//Update order status
//Update order status
exports.updateOrderStatus = async(req,res)=>{
    try{
        const {orderId, status}=req.body;
        const allowedStatuses = ["Processing","Shipped","Delivered","Cancelled"];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({message:"Invalid order status"})
        }
        const order = await Order.findByIdAndUpdate(orderId,{status},{new:true}).populate("products.product");
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        const products=order.products;
        if(status=="Cancelled")
        {
            for(let item of products)
            {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(400).json({ message: `Product ${item.product} not found` });
                }

                // Reduce stock only if there is enough quantity
                product.quantity+=item.quantity;
                    await product.save();
                
            }
        }
         res.status(200).json({message:"Order status updated successfully",order});

    }catch(e){
        res.status(500).json({message:"Error updating order status",error:e.message});

    }
};