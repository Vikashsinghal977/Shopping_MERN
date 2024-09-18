const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorhandler");



//Create Product  --> Admin 
exports.createProduct = async (req, res, next) => {
    
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    })

}


// Get all Product
exports.getAllProducts = async (req, res) => {

    const product = await Product.find();

    res.status(200).json({
        success:true,
        product
    });
}

//Get Product details
exports.getProducts = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHander("Product not fund", 404))
    }

    res.status(200).json({
        success:true,
        product
    })

}


//Update Product
exports.updateProduct = async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);

    if (!product){
        return res.status(500).json({
            success:false,
            message:"Product Not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:false})

    res.status(200).json({
        success:true,
        product
    })
}


//Delete Product
exports.deleteProduct = async(req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    // console.log(product)

    if (!product){
        return res.status(500).json({
            success:false,
            massage:"product not found"
        })
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        massage:"Product deleted succefully"
    })
}