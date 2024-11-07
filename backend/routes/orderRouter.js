const express = require("express");
const router = express.Router();
const { Orders } = require("../models/orders");
const zod = require("zod");
const {authMiddleware} = require("../middleware/authMiddleware")

router.post("/checkout", authMiddleware, async function (req, res) {
  const userId = req.userId
  try {
    const newOrderData = {
      ...req.body,
      user: userId,
    };
    const newOrder = new Orders(newOrderData);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getOrdersByUserId/:userId", async function (req, res){
  const {userId} = req.params;
  try{
    const orders = await Orders.find({user: userId});
    if(!orders){
      return res.status(404).json({
        message: "User Not Found",
      })
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    })
  }
  catch(error){
    res.status(500).json({
      message: "Error fetching orders",
      error: error,
    })
  }
})

router.get("/getOrderById/:orderId", async function (req, res){
  const {orderId} = req.params;
  try{
    const orders = await Orders.findById(orderId);
    if(!orders){
      return res.status(404).json({
        message: "Order Not Found",
      })
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      orders,
    })
  }
  catch(error){
    res.status(500).json({
      message: "Error fetching order",
      error: error,
    })
  }
})


module.exports = router;