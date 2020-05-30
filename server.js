const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')
connectDB()


const app = express(); 
 
app.use(express.json())  
  

app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000; 
dotenv.config({ path: './config/config.env' })



app.use('/api', require('./routes/route')) 


app.listen(PORT, () => {
    console.log(`The Server is Running in ${process.env.NODE_ENV} on port ${PORT}`)
}) 