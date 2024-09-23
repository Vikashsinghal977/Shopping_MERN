const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProducts } = require("../controller/productController");
const { isAuthenticateUser, authorizRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts)

router.route("/products/new").post(isAuthenticateUser, authorizRoles("admin"),createProduct)

router
    .route("/products/:id")
    .put(isAuthenticateUser, authorizRoles("admin"), updateProduct)
    .delete(isAuthenticateUser, authorizRoles("admin"), deleteProduct)
    .get(getProducts)

module.exports = router