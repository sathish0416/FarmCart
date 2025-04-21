const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
    changeStatusFarmer,
    changeStatusProduct,
updateOrderStatus,
    getAllFarmers,
    getAllProducts,
    getAllCustomer,
    getAllOrders
} = require("../controllers/adminController");

// const {authMiddleware}=require("../middlewares/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/farmer",changeStatusFarmer);
router.put("/product", changeStatusProduct);
router.put("/order", updateOrderStatus);
router.get("/farmers",getAllFarmers);
router.get("/order",getAllOrders);
router.get("/products",getAllProducts);
router.get("/customers",getAllCustomer);

module.exports = router;
