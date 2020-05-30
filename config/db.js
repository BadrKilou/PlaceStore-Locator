const mongoose = require('mongoose');
const path = require('path')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }  catch (err){
        console.log(err)
        process.exit(1)
    }
}
require('dotenv').config({ path: './config/config.env' })

module.exports = connectDB