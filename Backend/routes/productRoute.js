const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProducts } = require("../controller/productController");
const { isAuthenticateUser } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticateUser, getAllProducts)

router.route("/products/new").post(createProduct)

router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getProducts)

module.exports = router