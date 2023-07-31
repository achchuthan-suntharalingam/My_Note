const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const PORT = process.env.PORT || 8000

connectDB().then(()=>{
    console.log("Coneected to MongoDB");
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
