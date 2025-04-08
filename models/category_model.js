const mongoose = require('mongoose')

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    desc: { type: String }
})

const Category = mongoose.model('Category', CategorySchema, "categories")

module.exports = Category; 