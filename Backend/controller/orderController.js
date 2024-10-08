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
    
    const orders = await Order.find({user:req.user._id});
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

// Update orderStatus -> Admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === "Delivered"){
        return next(new ErrorHander("You have already delivered this Order",400))
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })

})


async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock-= quantity

    await product.save({validateBeforeSave:false});
}

// Delete order -> Admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order){
        return next(new ErrorHander("Order not found", 404))
    }

    await order.deleteOne();
    res.status(200).json({
        success:true,
    })

})