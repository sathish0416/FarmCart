const Farmer = require("../models/Farmer");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const Order = require("../models/Order")
const Customer = require("../models/Customer");
const Notification = require("../models/Notification")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin Registered successfully" });

    } catch (e) {
        res.status(500).json({ message: "Error registering admin", error: e.message });
    }
};

exports.loginAdmin = async (req, res) => {
   
    try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
    return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: "Admin Registered successfully" });

    } catch (e) {
    res.status(500).json({ message: "Error registering admin", error: e.message });
    }
};

exports.loginAdmin = async (req, res) => {
 try {
 const { email, password } = req.body;
 const admin = await Admin.findOne({ email });
 if (!admin) {
  return res.status(400).json({ message: "Invalid credentials" });
 }
 const isMatch = await bcrypt.compare(password, admin.password);
 if (!isMatch) {
  return res.status(400).json({ message: "Invalid credentials" });
 }
 const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: "1h" });
 res.json({ message: "Admin Login Successful", token });
 } catch (e) {
 res.status(500).json({ message: "Error logging in", error: e.message });
 }
};

exports.changeStatusFarmer = async (req, res) => {
    try {
        const { id, verificationStatus } = req.body;
        if (!["Approved", "Rejected"].includes(verificationStatus)) {
            return res.status(400).json({ error: "Invalid verification status" });
        }

        const farmer = await Farmer.findByIdAndUpdate(
            id,
            { verificationStatus },
            { new: true }
        );
        const notificationMessage = `Congrantulatoins! You are approved farmer now. Your products can be seen by customers`;

        await Notification.create({ userId:id,userRole:"Farmer",title:"You are Approved", message: notificationMessage });


        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        res.status(200).json({ message: `Farmer ${verificationStatus} successfully`, farmer });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.changeStatusProduct = async (req, res) => {
    try {
        const { id, status } = req.body;
console.log(id,status);
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid product status" });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: `Product ${status} successfully`, product });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateOrderStatus = async (req,res) => {
    try {
        const {orderId,status}=req.body;
        // Fetch order details
        const order = await Order.findById(orderId).populate("products.product");

        if (!order) {
            return console.error("Order not found");
        }

        // Update order status
        order.status = status;
        await order.save();

        // Notification messages for different statuses
        const customerMessage = `Your order status has been updated to: ${status}.`;
        
        // Notify customer for every update
        await Notification.create({
            userId: order.customer,
            userRole:"Customer",
            message: customerMessage,
            title: "Order Update",
        });

        console.log(`Customer notified: ${customerMessage}`);

        // Notify farmers for specific statuses
        for (const item of order.products) {
            const farmer = item.farmer; // Get farmer details from product
            if (farmer) {
                let farmerMessage = "";
                
                if (status === "Confirmed") {
                    farmerMessage = `Order for ${item.product.name} has been confirmed. Get ready for shipment!`;
                } else if (status === "Delivered") {
                    farmerMessage = `Order for ${item.product.name} has been successfully delivered.`;
                }

                if (farmerMessage) {
                    await Notification.create({
                        userId: farmer._id,
                        userRole:"Farmer",
                        message: farmerMessage,
                        title: "Order Update",
                    });

                    console.log(`Farmer ${farmer._id} notified: ${farmerMessage}`);
                }
            }
        }
        console.log("All notifications sent successfully.");
        res.status(200).json({ message: `Order ${status} successfully` });


    } catch (error) {
        console.error("Error updating order status:", error);
    }
};

exports.getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("farmer", "name email");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
        
};


exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .select("orderId customer products status createdAt") // Fetch only necessary fields
        .populate({ path: "customer", select: "name" }) // Fetch only customer name & ID
        .populate({
          path: "products.product",
          select: "name", // Fetch only product name & ID
        })
        .lean(); // Reduce Mongoose overhead
  
      // Construct a minimal response
      const processedOrders = orders.map(order => ({
        id:order._id,
        orderId: order.orderId,
        status: order.status || "Processing",
        createdAt: order.createdAt,
        customer: {
          id: order.customer?._id,
          name: order.customer?.name,
        },
        products: order.products.map(item => ({
          id: item.product?._id,
          name: item.product?.name,
          quantity: item.quantity,
        })),
      }));
  
      res.status(200).json(processedOrders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
  };
  



exports.getAllFarmers = async (req, res) => {
 try {
  const farmers = await Farmer.find();
  res.status(200).json(farmers);
 } catch (error) {
  res.status(500).json({ error: "Internal server error" });
 }
};

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find()
        .select('-image') // Exclude the 'image' field
        .populate("farmer", "name email"); // Populate the farmer field with name and email
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
exports.getAllCustomer = async(req,res)=>{
    try{
        const customers=await Customer.find();
        res.status(200).json(customers);
    }catch(e){
        res.status(500).json({error:e.message});
    }
}