const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrder } = require("../controller/orderController");
const { isAuthenticateUser, authorizRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticateUser,newOrder);
router.route("/order/me").get(isAuthenticateUser,myOrders)
router.route("/admin/orders").get(isAuthenticateUser, authorizRoles("admin"), getAllOrder)

router.route("/order/:id").get(isAuthenticateUser,getSingleOrder)


module.exports = router