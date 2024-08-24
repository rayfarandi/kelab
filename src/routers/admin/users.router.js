const userRouter = require('express').Router() // import module express
const userController = require('../../controllers/admin/user.controller')

userRouter.get ('/', userController.getAllUsers)
userRouter.get ('/:id', userController.getDetailUser)
userRouter.post('/', userController.createUser)
userRouter.patch('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
module.exports = userRouter