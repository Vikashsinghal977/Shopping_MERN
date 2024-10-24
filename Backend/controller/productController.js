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

    const resultPerpage = 8

    const productsCount = await Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerpage);

    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerpage
    });
});

//Get Product details
exports.getProductsDetails = catchAsyncError(async (req, res, next) => {

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

    if (!product){
        return next(new ErrorHander("Product not fund", 404))
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        massage:"Product deleted succefully"
    })
})

//create Product Review and Update Product Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);


    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString()===req.user._id.toString()
    );


    if (isReviewed){

        product.reviews.forEach((rev) => {

            if (rev.user.toString()===req.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment)

        });

    }
    else{

        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg+=rev.rating
    })

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
    })
})

//Get All Product Review
exports.getProductReview = catchAsyncError(async (req, res, next) =>{

    const product = await Product.findById(req.query.id);

    if (!product){
        return next(new ErrorHander("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    })
    
}) 

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product){
        return next(new ErrorHander("Product not fund", 404))
    }

    if (!req.body.id){
        return next(new ErrorHander("Id not found", 404))
    }

    const reviews = product.reviews.filter(
         (rev) => rev._id.toString() !== req.query.id.toString()
        );

    let avg = 0; 
    reviews.forEach((rev) => {
        avg+=rev.rating
    })

    const ratings = avg/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,   
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        message:`Product deleted successfully`
    })
})