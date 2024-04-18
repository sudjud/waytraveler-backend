const Category = require("../models/Category.model");

module.exports.categoryControllers = {  
    getAllCategories : (req, res) => {
        Category.find({}, (err, data) => {
            if (!err) {
                res.json(data)
            }
        })
    },
    categoryCreate : async (req, res) => {
        try {
            const category = await Category.create({
                ...req.body
            })
            res.json(category)
        } catch (e) {
            res.json(e)
        }
    },
    categoryRemoveAdmin : async (req, res) => {
        const { categoryId } = req.params
        try {
          const category = await Category.findByIdAndRemove(categoryId)  
          res.json('Категория удалена!')
        } catch (e) {
            res.json(e)
        }
    },
    categoryUpdateAdmin : async (req, res) => {
        const { categoryId } = req.params
        try {
          const category = await Category.findByIdAndUpdate(categoryId, {
            ...req.body
          })
          res.json('Категория изменена!')
        } catch (e) {
            res.json(e)
        }
    }
}