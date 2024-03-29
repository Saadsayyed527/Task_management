const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors= require('cors');
require('./db')
require('dotenv').config();
const PORT= process.env.PORT || 8000;

const userRoutes = require('./Routes/userRoutes')
const taskRoutes = require('./Routes/taskRoutes')


app.use(bodyParser.json());


app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);


app.get('/',(req,res)=>{
 res.send("api working task manager");
})
app.listen(PORT,()=>{
 console.log(`runnning on ${PORT} `);
})