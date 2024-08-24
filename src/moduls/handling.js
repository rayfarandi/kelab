// membuat fungsi handling untuk kode redundan

const db = require('../lib/db.lib')
const argon = require('argon2')

exports.isExist = async(table, id) =>{
    try{
        const query = `SELECT "id" FROM "${table}"`
        const {rows} = await db.query(query)
        const results = rows.map(item => item.id)
        if (results.indexOf(id) === -1){
            throw new Error(`data with id ${id} not found`)
        }
    } catch(error){
        return error.message
    }
}

exports.isStringExist = async (table, uniqueColumn, searchKey) =>{
    const sql = `SELECT * FROM "${table}" WHERE ${uniqueColumn} ILIKE $1`
    let values = [searchKey]
    const {rows} = await db.query(sql,values)

    if(rows.length){
        if(uniqueColumn === "name"){
            throw new Error(`${table} with ${uniqueColumn} ${rows[0].name} already exist`)
        }else if(uniqueColumn === "email"){
            throw new Error (`${uniqueColumn} ${rows[0].email} already registered`)
        }else if(uniqueColumn === "code"){
            throw new Error (`${table} with ${uniqueColumn} ${rows[0].code} already exist`)
        }
    }
}

exports.updateColumn = async (id,body,table) =>{
    if(Object.hasOwn(body,'password')){
        body.password = await argon.hash(body.password)
    }

    const columns = Object.keys(body)
    let values = [id,...Object.values(body)]
    const set = columns.map((items,index)=> {
        return `"${items}" = $${index+2}`
    })
    if(!set.length){
        return `No data has been modifed`
    }
    const sql = `UPDATE "${table}" SET ${set.join(',')}, "updatedAt" = now() WHERE "id" = $1 RETURNING *`
    const {rows} = await db.query(sql,values)
    return rows[0]
}

exports.errorHandler = (error, res) => {
    console.log(error)
    if(error.code === "23502"){ // kode error not null constraint
        return res.status(400).json({                                                              
            success: false,
            message: `${error.column} cannot be empty`                                                 
        })
    }else if(error.code === "23505"){ // kode error unique constraint
        return res.status(400).json({                                                              
            success: false,
            message:`${error.detail.split(' ')[1].replaceAll(/[()="]/g, ' ').trim()} already exist`                               
        })
    }else if(error.code === "42703"){ // kode error column does not exist
        return res.status(400).json({
            success: false,
            message: error.message.replaceAll('"', '')
        })
    }else if(error.code === "22P02"){ // kode error salah input type data
        return res.status(406).json({
            success: false,
            message: error.message.replaceAll('"', '')
        })
    }else if(error.code === "23503"){ // kode error foreign key / keterkaitan table
        return res.status(409).json({
            success: false,
            message: error.detail.replaceAll(/[()="]/g, ' ').replace('Key', 'data with')
        })
    }else if(error.message.includes("found")){  // pesan dan status error not found
        return res.status(404).json({                                                              
            success: false,
            message: error.message     // message error berasal dari error custom =>  throw new Error('message')                                               
        })
    }else if(error.message.includes("not registered") || error.message.includes("wrong password") || error.message.includes("invalid token") || error.message.includes("malformed")){ // error forbidden access = login dan otorisasi auth.middleware
            return res.status(401).json({
            success: false,
            message: error.message
            })
    }else if(error.message === 'jwt must be provided'){
        return res.status(403).json({
            success: false,
            message: error.message
            })
    }else if(!error.code){
        return res.status(400).json({                                                              
            success: false,
            message: error.message  // message error berasal dari error custom =>  throw new Error('message')                                               
        })
    }

    return res.status(500).json({                                                              
        success: false,
        messages: `Internal server error`                                                 
    })
}