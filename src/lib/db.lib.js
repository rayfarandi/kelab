const {Pool} = require('pg')

const db = new Pool ({
    //Pool digunakan untuk membuat koneksi database
    connectionString : process.env.DATABASE_URL  // database yg ingin di koneksikan dipanggil dari .env
})

db.connect((err) =>{
    // membuka atau mendapat koneksi dari poll, callback akan mengeksekusi jika berhasil atau gagal
    // connect() di gunakan untuk mengaktifkan koneksi yg di buat
    if(!err){
        console.log('Connected Successfully')
    }
})

module.exports = db