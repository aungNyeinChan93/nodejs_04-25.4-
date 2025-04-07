const mongoose = require("mongoose");

const { Schema } = mongoose;

const TestSchema = new Schema({
    name: { type: Schema.Types.String, required: true, unique: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true, unique: true },
})

const Test = mongoose.model('tests', TestSchema);

module.exports = Test