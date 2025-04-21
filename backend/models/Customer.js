const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],


}, { timeStamps: true });

module.exports = mongoose.model("Customer", customerSchema);