const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    created_at: { type: Schema.Types.Date, default: Date.now }
})

const Post = mongoose.model('Post', PostSchema, 'posts');

module.exports = Post;