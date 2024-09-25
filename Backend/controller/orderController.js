const Order = require("../models/orderModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productmodels");

// Create New Order 
exports.newOrder = catchAsyncError(async(req, res, next) => {

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

// Get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    console.log("strat get single order")
    
    const order = await Order.findById(req.params.id).populate("user","name email")

    if (!order){
        return next(new ErrorHander("Order not found", 404))
    }

    res.status(200).json({
        success:true,
        order,
    })

})


// Get Logged in user order
exports.myOrders = catchAsyncError(async (req, res, next) => {
    console.log("Start myOrder")
    
    const orders = await Order.find({user:req.user._id});
    console.log("orders",orders)
    if (!orders){
        return next(new ErrorHander("Order not found", 404))
    }

    res.status(200).json({
        success:true,
        orders,
    })

})


// Get All order -> Admin
exports.getAllOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders){
        return next(new ErrorHander("Order not found", 404))
    }

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        orders,
        totalAmount,
    })

})