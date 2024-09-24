const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductsDetails } = require("../controller/productController");
const { isAuthenticateUser, authorizRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts)

router
    .route("/admin/products/new")
    .post(isAuthenticateUser, authorizRoles("admin"),createProduct)

router
    .route("/admin/products/:id")
    .put(isAuthenticateUser, authorizRoles("admin"), updateProduct)
    .delete(isAuthenticateUser, authorizRoles("admin"), deleteProduct)

router.route("products/:id").get(getProductsDetails)

module.exports = router