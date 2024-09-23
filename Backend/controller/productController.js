const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product  --> Admin 
exports.createProduct = catchAsyncError(async (req, res, next) => {
    
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    });
});

// Get all Product
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerpage = 5

    const productCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerpage);

    const product = await apiFeature.query;

    res.status(200).json({
        success:true,
        product,
        productCount
    });
});

//Get Product details
exports.getProducts = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHander("Product not fund", 404))
    }

    res.status(200).json({
        success:true,
        product
    })

});


//Update Product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHander("Product not fund", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:false})

    res.status(200).json({
        success:true,
        product
    })
})


//Delete Product
exports.deleteProduct = catchAsyncError(async(req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    // console.log(product)

    if (!product){
        return next(new ErrorHander("Product not fund", 404))
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        massage:"Product deleted succefully"
    })
})