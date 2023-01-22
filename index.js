const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const ExpressValidator = require('express-validator');



//* Import Routes 
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/users');
const categoryRoutes = require('./routers/categories');
const productRoutes = require('./routers/products');



//* config app
const app = express();
require('dotenv').config();

//* DB mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true
})
        .then(()=> console.log('db is connected...'))
        .catch(() => console.log('db cannot connect...'))


//*Middelwares
app.use(express.json());
app.use(cookieParser());
app.use(ExpressValidator());


//! Routes Middelwares
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);


const port = process.env.PORT||3000;

app.listen(port, () => console.log(`app is running on port ${port}`));
