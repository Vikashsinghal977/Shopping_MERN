const Order = require("../models/orderModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productmodels");

exports.newOrder = catchAsyncError(async(req, res, next) => {
    console.log("Start")

    const {
        shypingInfo,
        orderItems,
        paymentInfo,    
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shypingInfo,
        orderItems,
        paymentInfo,    
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    });

    res.status(201).json({
        success:true,
        order,
    })
})