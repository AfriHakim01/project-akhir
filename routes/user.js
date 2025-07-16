const router = require('express').Router()
const User = require('../controllers/user')

router.post('/login', User.login)

router.post('/client', User.registerClient)
router.get('/client', User.clientList)

router.post('/admin', User.registerAdmin)

module.exports = router