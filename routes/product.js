const router = require("express").Router();
const upload = require("../app");
const ProductController = require("../controllers/product");
const auth = require("../middlewares/auth.middleware");

router.get("/", ProductController.productList);

router.use(auth);
router.post("/", upload.single("photo"), ProductController.createProduct);

module.exports = router;
