require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DB_URL);


app.listen(process.env.PORT, () => {
    console.log(`DB => ${process.env.DB_URL}`);
    console.log(`App is running in port ${process.env.PORT}`);

});