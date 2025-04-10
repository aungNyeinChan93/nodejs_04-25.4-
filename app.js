require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const path = require('path')

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

// // upload image
// app.post('/images', (req, res, next) => {
//     let fileName = req.files.image.name;
//     fileName = new Date().valueOf() + "_anc_" + fileName
//     const filePath = path.join(__dirname, '/public/images/') + fileName
//     req.files.image.mv(filePath, (err) => console.log(err));
//     res.json({ con: 'success', result: fileName })
// })

// images
const imageRouter = require('./routes/images')
app.use('/api/images', imageRouter)


