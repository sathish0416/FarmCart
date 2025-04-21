const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
    orderId: { type: Number, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: "true" },
        quantity: { type: Number, required: true },
    }, ],
    totalPrice: { type: Number, required: true },
    status: { type: String,enum:["Processing","Confirmed","Shipped","Delivered","Cancelled"], default: "Processing" },
}, { timestamps: true });

orderSchema.plugin(AutoIncrement, {
    inc_field: "orderId",
    start_seq: 10000000,
});

module.exports = mongoose.model("Order", orderSchema);