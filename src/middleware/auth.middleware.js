//middleware otorisasi

const jwt = require('jsonwebtoken')
const {errorHandler} = require('../moduls/handling')

const authMiddleware = (req, res, next) =>{
    try{
        const rawToken = req.headers.authorization || '' // Token otomatis disematkan/disimpan dalam permintaan pengguna (request), di dalam header Authorization sebagai Bearer token

        const prefix = "Bearer " //token di awali kata "Bearer "
        if(!rawToken.startsWith(prefix)){ //jika token di awali kata "Bearer " makan akan di lempar ke catch
            throw new Error('invalid token')
        }
        const token = rawToken.slice(prefix.length) //memotong kata "Bearer " untuk mengambil token
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'secretKey') // verify token
        // jika verifikasi berhasil jwt akan mengembalikan payload dan server bisa mengakses data payload misal untuk di gunakan di rolekCheck.middleware untuk mengecek role user
        // req.user = membuat properti baru(user) di object request yg berisi data payload
        // server bisa mengakses req.user.role unutk mendapatkan data role user
        next() //melanjutkan ke  middleware atau penanganan selanjutnya
    } catch(error){ //jika ada error maka akan menangkap error dan menjalankan fungsi errorHandler
        console.log(error)
        errorHandler(error, res)
    } 
}

module.exports = authMiddleware