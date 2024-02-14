const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config()

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        })
        console.log(`Database Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error Occured ${error.message}`)
    }
}

module.exports = connectDB