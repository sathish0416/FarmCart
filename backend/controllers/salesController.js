// // backend/controllers/salesController.js
// const mongoose = require("mongoose");
// const Order = require("../models/Order");

// const salesAnalysis = async (req, res) => {
//   const farmerId = req.customer.id;
//   console.log("Sales analysis requested for farmer:", farmerId);
//   try {
//     const analysis = await Order.aggregate([
//       { $unwind: "$products" },
//       {
//         $lookup: {
//           from: "products", // Ensure this is the correct collection name (check your MongoDB)
//           localField: "products.product",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       { $unwind: "$productDetails" },
//       {
//         $match: { "productDetails.farmer": mongoose.Types.ObjectId(farmerId) }
//       },
//       {
//         $group: {
//           _id: "$productDetails._id",
//           productName: { $first: "$productDetails.name" },
//           totalSold: { $sum: "$products.quantity" },
//           totalRevenue: {
//             $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
//           },
//           category: { $first: "$productDetails.category" },
//         },
//       },
//       { $sort: { totalSold: -1 } },
//     ]);
//     console.log("Aggregation result:", analysis);
//     return res.status(200).json(analysis);
//   } catch (error) {
//     console.error("Error in salesAnalysis:", error);
//     return res.status(500).json({ message: "Error generating sales analysis", error });
//   }
// };

// module.exports = { salesAnalysis };
