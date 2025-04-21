const mongoose = require("mongoose");
const farmerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    verificationStatus: { type: String, default: "Pending" },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"

    }],
}, { timestamps: true });

module.exports = mongoose.model("Farmer", farmerSchema);