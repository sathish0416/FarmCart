const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Store images in memory buffer
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const farmerRoutes = require("./routes/farmerRoutes");
const notificationRoutes = require("./routes/notificationRoutes")
const customerRoutes = require("./routes/customerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mapApiRoutes = require("./routes/map_routes");
connectDB();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*"); // Allow any frontend origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Handle preflight requests
    }

    next();
});


 
app.use(express.json());
app.use("/api/farmer", farmerRoutes);
app.use("/api/customer",customerRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/location",mapApiRoutes);
app.use("/api/notification",notificationRoutes);

app.listen(5000, () => {
    console.log("Server is running");
})