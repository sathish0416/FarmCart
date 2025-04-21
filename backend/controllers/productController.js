const Product = require("../models/Product");

exports.getApprovedProducts = async (req,res)=>{
    try{
        const {category}=req.query;
        let query = {status:"Approved"};
        if(category){
            query.category=category;
        }
        const products= await Product.find(query).populate("farmer","name mobile address");
        res.json(products);

    }catch(e)
    {
        res.status(500).json({message:"Error fetching products", error:e.message});
    }
};


exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, category, marketRate, price, quantity, status, expiryDate } = req.body;
    const farmerId = req.customer.id; // Extracted from the authMiddleware

    // Find product by productId and ensure it belongs to the authenticated farmer
    const product = await Product.findOne({ _id:productId, farmer: farmerId });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    // Update product details
    if (name) product.name = name;
    if (category) product.category = category;
    if (marketRate) product.marketRate = marketRate;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (status) product.status = status;
    if (expiryDate) product.expiryDate = expiryDate;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const farmerId = req.customer.id; // Extracted from authentication middleware
  
      console.log("Deleting productId:", productId);
      console.log("Authenticated farmerId:", farmerId);
  
      // Ensure productId is a valid number (if using auto-increment) or a valid ObjectId
    //   if (isNaN(productId)) {
    //     return res.status(400).json({ message: "Invalid productId format" });
    //   }
  
      // Find the product and ensure it belongs to the authenticated farmer
      const product = await Product.findOne({ _id:productId, farmer: farmerId });
  
      if (!product) {
        return res.status(404).json({ message: "Product not found or unauthorized" });
      }
  
      // Delete the product
      await Product.deleteOne({ _id:productId, farmer: farmerId });
  
      res.status(200).json({ message: "Product deleted successfully" });
  
    } catch (error) {
      console.error("Delete error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
