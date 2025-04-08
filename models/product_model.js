const mongoose = require('mongoose')

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: Schema.Types.String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    amount: { type: Number, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [string],
    desc: { type: Schema.Types.String, default: null },
    color: [String],
    shipping: [
        {
            type: { type: String, required: true },
            shipping_fee: { type: String, required: true },
            deliver_date: { type: Schema.Types.Date, default: Date.now }
        }
    ],
    inStock: { type: Schema.Types.Boolean, default: true },
    images: [{
        url: { type: String, required: true },
        desc: { type: String }
    }],
})

// indexing
ProductSchema.index({ tags: 1, category: 1, user_id: 1 })

const Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = Product;