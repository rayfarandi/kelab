const router = require("express").Router()

// role check for user
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')


router.use('/auth', require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleware("admin"), require('./admin'))                            // setiap ada permintaan ke path /admin authMiddleware dan roleCheckMiddleware akan selalu dijalankan untuk pengecekan otorisasi

module.exports = router