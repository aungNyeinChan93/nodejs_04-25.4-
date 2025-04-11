const { getUserCache } = require('../utils/cache')
const Category = require('../models/category_model')
const { response } = require('../utils/base')

const all = async (req, res, next) => {
    const categories = await Category.find();
    response(res, 'ALl categories', categories, 200)
};


const create = async (req, res, next) => {
    try {
        const fields = {
            name: req.body.name,
            desc: req.body.desc,
            image: req.imageLink,
        }

        if (!fields.name) return next(new Error('Category name field is required'));
        if (!fields.image) return next(new Error('Category image field is required'));

        const category = await Category(fields).save();

        response(res, "Category create success", category, 201)
    } catch (error) {
        next(new Error(error.message))
    }
};

const show = async (req, res, next) => { };
const update = async (req, res, next) => { };
const destroy = async (req, res, next) => { };

module.exports = {
    all, show, create, update, destroy
}