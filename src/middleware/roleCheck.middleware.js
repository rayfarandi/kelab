const roleCheckMiddleware =(role) =>{
    return (req,res, next) =>{
        if(req.user.role !== role){ // req.user.role berisi payload yg di dapat saat verifikasi token di auth.middleware dan token di dapat dari saat login di auth.controller
            return res.status(403).json({ // menampilkan status 403 forbidden jika salah role user
                success: false, 
                message: 'forbidden access'})
        }
        next()
    }
}

module.exports = roleCheckMiddleware