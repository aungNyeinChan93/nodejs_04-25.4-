require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))


app.listen(process.env.PORT, () => {
    console.log(`DB => ${process.env.DB_URL}`);
    console.log(`App is running in port ${process.env.PORT}`);

});

// auth
const userRouter = require('./routes/users')
app.use('/api/users', userRouter)

// images
const imageRouter = require('./routes/images')
app.use('/api/images', imageRouter)

// categories
const categoryRouter = require('./routes/categories')
app.use('/api/categories', categoryRouter);


