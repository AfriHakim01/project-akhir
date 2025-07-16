const {User} = require('../models')
const { verifyToken } = require('../utils/jwt')

module.exports = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token) throw {name: 'Unauthorized', errors: [{message: 'Unauthorized User'}]}
        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)
        if(!user) throw {name: 'Unauthorized', errors: [{message: 'Unauthorized User'}]}
        console.log('User found:', user);
        
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}