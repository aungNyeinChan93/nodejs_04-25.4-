const { getUserCache } = require('../utils/cache')
const Category = require('../models/category_model')
const { response, Base } = require('../utils/base')
const { deleteImage } = Base()
const { deleteFileByLink } = require('../middlewares/imageUpload')
const { ErrorFile } = require('../utils/base')

const all = async (req, res, next) => {
    try {
        const categories = await Category.find();
        response(res, 'ALl categories', categories, 200)
    } catch (err) {
        ErrorFile.write(err.message)
        next(new Error(err.message))
    }
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
        const category_name = await Category.findOne({ name: fields.name });
        if (category_name) return next(new Error('Category name is already has been used'));
        const category = await Category(fields).save();

        response(res, "Category create success", category, 201)
    } catch (error) {
        next(new Error(error))
    }
};

const show = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) return next(new Error('Category is not found!'));
        response(res, "Category has been found", category, 200)
    } catch (error) {
        next(new Error(error))
    }
};
const update = async (req, res, next) => {
    try {
        const fields = {
            name: req.body.name,
            desc: req.body.desc,
            image: req.imageLink,
        }
        const category_db = await Category.findById(req.params.id);
        if (!category_db) return next(new Error('Category is not found!'))

        // delete old image
        deleteImage(category_db.image)

        // update category
        const updateCategory = await Category.findByIdAndUpdate(category_db._id, fields);

        response(res, "Category Update Success!", updateCategory, 201)

    } catch (error) {
        next(new Error(error.message))
    }
};

const destroy = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        // if (!category) return next(new Error('Category not found!'));
        deleteFileByLink(next, category.image)
        await Category.findByIdAndDelete(category._id);
        response(res, 'Category Delete Successfully', {}, 200)
    } catch (error) {
        next(new Error(error))
    }
};

module.exports = {
    all, show, create, update, destroy
}