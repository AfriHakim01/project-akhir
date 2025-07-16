const router = require('express').Router();
const auth = require("../middlewares/auth.middleware");


router.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

router.use('/user', require('./user'))
router.use('/product', require('./product'))
router.use(auth)
router.use('/order', require('./order'))

module.exports = router;    