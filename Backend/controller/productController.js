const Product = require("../models/productmodels");



//Create Product
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    
    res.state(201).json({
        success:true,
        product
    })

}

exports.getAllProducts = (req, res) => {
    res.state(200).json({mesage:"route is working"});
} 