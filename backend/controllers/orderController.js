const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Product=require("../models/Product");
const Farmer = require("../models/Farmer")
const Notification = require("../models/Notification")

exports.removeFromCart = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { itemId } = req.params; // Get product ID from request body
    const productId = itemId;

    // Find the customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the cart
    if (!customer.cart.includes(productId)) {
      return res.status(400).json({ message: "Product not found in cart" });
    }

    // Add product to cart
    customer.cart.pull(productId);
    await customer.save();

    res.status(200).json({ message: "Product removed from cart", cart: customer.cart });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.placeOrder = async (req,res)=>{
    try{
        const { products}=req.body;
        const customerId = req.customer.id;
        
        console.log(products,customerId);
        const customer = await Customer.findById(customerId);


        let totalPrice=0;
        let orderItems=[];

        for(let item of products)
        {
            const product = await Product.findById(item._id);
            if(!product || product.status !== "Approved"){
                return res.status(400).json({message:`Product ${item._id} not awailable or not approved`});
            }
            if(item.quantity > product.quantity){
                return res.status(400).json({message:`Insufficinet stock fro product ${product.name}`});
            }
            totalPrice += product.price*item.quantity;
            orderItems.push({product:product._id, quantity:item.quantity});
            customer.cart.pull(product._id);



            product.quantity-=item.quantity;
            const notificationMessage = `New order: ${item.quantity} units of ${product.name} by ${customer.name}`;
            await Notification.create({ userId: product.farmer._id,userRole:"Farmer",title:"Got New Order", message: notificationMessage });
         

            await product.save();
            await customer.save();
        }
        const order = new Order({customer:customerId,products:orderItems,totalPrice});
        await order.save();
        await Customer.findByIdAndUpdate(customerId,{$push:{order:order._id}});
        res.status(201).json({message:"order placed successfully"});
        

    }catch(e)
    {
        res.status(500).json({message:"Error placing order", error:e.message});

    }
};

