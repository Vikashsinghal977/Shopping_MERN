const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProducts } = require("../controller/productController");

const router = express.Router();

router.route("/products").get(getAllProducts)

router.route("/products/new").post(createProduct)

router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getProducts)

module.exports = router