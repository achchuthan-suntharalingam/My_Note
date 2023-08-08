const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/dbConfig');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(cors(corsOptions));
app.use(cors());
app.use(errorHandler);

//routing
app.use('/users', require('./routes/userRoutes'));
app.use('/notes', require('./routes/notesRoutes'));
app.use('/users/auth', require('./routes/userAuthRoutes'));

connectDB().then(()=>{
    console.log("Connected to MongoDB");
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

