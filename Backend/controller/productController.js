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

//create Product Review and Update Product Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const {rating, comment, productId} = req.body;
    console.log("Stap 1", req.body.productId)
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    console.log("Stap 2",req.body.productId)
    const product = await Product.findById({_id: productId});
    console.log("product",product);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString()===req.user._id.toString()
    );

    console.log("Stap 3")

    if (isReviewed){
        console.log("Stap 4 >")
        product.reviews.forEach((rev) => {
            console.log("Stap 4>>")
            if (rev.user.toString()===req.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment)
            console.log("Stap 4>>>")
        });
        console.log("Stap 4")
    }
    else{
        console.log("Stap 5")
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    console.log("Stap 6")
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg+=rev.rating
    })
    console.log("Stap 7")
    product.ratings = avg/product.reviews.length;
    console.log("Stap 8")
    await product.save({validateBeforeSave:false})
    console.log("Stap 9")
    res.status(200).json({
        success:true,
    })
})