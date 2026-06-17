const express = require("express");
const router = express.Router();
const { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder 
} = require("../controllers/orderController");

// Sagle order related requests router var map karne
router.route("/").post(createOrder).get(getAllOrders);
router.route("/:id").get(getOrderById).put(updateOrderStatus).delete(deleteOrder);

module.exports = router;