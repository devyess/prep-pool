const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app=express();
const connectDB=require('./services/mongo.service');
const userRoutes = require('./routes/user.routes');
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

connectDB();
app.use('/users',userRoutes);

app.listen(process.env.PORT,()=>{
      console.log(`Server is running on port ${process.env.PORT}`);
});