const express = require("express");
const {registerCustomer,loginCustomer, updateCustomerProfile,getCustomerOrders,addToWishlist,getWishlist,removeFromCart,removeFromWishlist,getCart,addToCart}=require("../controllers/customerController");
const {getApprovedProducts}=require("../controllers/productController");
const {placeOrder}=require("../controllers/orderController");
const {authMiddleware}= require("../middlewares/authMiddleware");

const router=express.Router();

router.post("/register",registerCustomer);
router.post("/login",loginCustomer);
router.get("/products",authMiddleware,getApprovedProducts);
router.post("/order",authMiddleware,placeOrder);
router.get("/order",authMiddleware,getCustomerOrders);
router.put("/profile",authMiddleware,updateCustomerProfile);
router.post("/wishlist",authMiddleware,addToWishlist);
router.get("/wishlist",authMiddleware,getWishlist);
router.post("/cart",authMiddleware,addToCart);
router.get("/cart",authMiddleware,getCart);
router.delete("/wishlist/:itemId", authMiddleware, removeFromWishlist);
router.delete("/cart/:itemId",authMiddleware,removeFromCart);

module.exports = router;