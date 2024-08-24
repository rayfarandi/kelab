const adminRouter = require('express').Router() // import module express

adminRouter.use('/users',require('./users.router'))
module.exports = adminRouter // mengeksport router agar bisa di import di tempat lain