const mongoose = require('mongoose')

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
})