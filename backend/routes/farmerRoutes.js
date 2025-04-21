const express = require("express");
const {registerFarmer,loginFarmer,viewOwnProducts, addProduct, viewOrders, updateOrderStatus,updateFarmerProfile} = require("../controllers/farmerController");
const {authMiddleware}=require("../middlewares/authMiddleware");
const {updateProduct,deleteProduct}=require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Store images in memory buffer
// const { salesAnalysis } = require("../controllers/salesController"); // Import salesAnalysis 


router.post("/register",registerFarmer);
router.post("/login",loginFarmer);
router.get("/products",authMiddleware,viewOwnProducts);
router.post("/products", authMiddleware,upload.single("image"), addProduct);
router.get("/orders",authMiddleware,viewOrders);
router.put("/orders",authMiddleware,updateOrderStatus);
router.put("/products/:productId",authMiddleware,updateProduct);
router.delete("/products/:productId",authMiddleware,deleteProduct);
router.put("/profile",authMiddleware,updateFarmerProfile);


// Sales Analysis Endpoint (new)
// router.get("/sales-analysis", authMiddleware, salesAnalysis);


module.exports = router;