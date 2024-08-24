const userModel = require('../models/user.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const {errorHandler} = require('../moduls/handling')

exports.login = async (req, res)=>{
    try{
        const {email, password} = req.body
        if(!email){
            throw new Error(`enter your email are required`)
        }
        const user = await userModel.findOneByEmail(email)
        if (!user) {
            throw new Error(`email not registered`)
        }
        
        if(!password){
            throw new Error(`enter your password are required`)
        }
        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw new Error(`wrong password`)
        }
        const payload = {
            id: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.APP_SECRET || 'secretKey')
        
        return res.json({
            success: true,
            message: 'login success',
                results:{
                    user: user.email,
                    token:token
                }
        })
    }catch (error){
        errorHandler(error, res)
    }
}




exports.register = async (req, res) => {   // sederhananya insert data ke table users di database
    try {
        const {fullName, email, password, confirmPassword,address} = req.body  // destruct req.body

        if(!fullName){
            throw new Error(`Full Name cannot be empty`)
        }

        if(!email){
            throw new Error(`email cannot be empty`)
        }

        const user = await userModel.findOneByEmail(email) // handling isStringExist di insert tidak berjalan jika methode guarding di jalankan, sehingga membuat handling error baru               
        if(user){
            throw new Error(`email already registered`)                                                
        }

        if(!password){
            throw new Error(`password cannot be empty`)
        }

        if(!confirmPassword){
            throw new Error(`please confirm password`)
        }

        if(password !== confirmPassword){
            throw new Error(`wrong confirm password`)
        }

        await userModel.insert({                                                        
            fullName,
            email,
            password,
            address,                  // password di hash di userModel insert
            role: "customer"
        })

        return res.json({
            success: true,
            message: 'Register success',
            results:{
                user: email,
                fullName: fullName
            }
        })
    } catch (error) {
        errorHandler(error, res)
    }
}