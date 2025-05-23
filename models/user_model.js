const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true, unique: true },
    phone: { type: Schema.Types.String },
    password: { type: Schema.Types.String, required: true },
    role: { type: Schema.Types.String, enum: ["user", "admin"], default: 'user' },
    point: { type: Schema.Types.Number, default: 0 },
    created_at: { type: Schema.Types.Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;