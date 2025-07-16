const OrderController = require("../controllers/order");

const router = require("express").Router();

router.post("/", OrderController.createCart);
router.get("/", OrderController.getCart);


module.exports = router;