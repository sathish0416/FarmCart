const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const reviewSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema(
    {
        productId: { type: Number, unique: true },
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        marketRate: { type: Number, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        expiryDate: { type: Date, required: true },

        farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },

        image: {
            data: Buffer, // Stores binary image data
            contentType: String // Stores image format (e.g., "image/png", "image/jpeg")
        },

        ratings: { type: Number, default: 0 }, // Average rating
        reviews: [reviewSchema] // List of reviews

    },
    { timestamps: true }
);

// Auto-increment productId
productSchema.plugin(AutoIncrement, {
    inc_field: "productId",
    start_seq: 100000
});

module.exports = mongoose.model("Product", productSchema);
