const Category = require('../models/category.model');
const Course = require('../models/courses.model');
const asyncHander = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbid');

module.exports = {
    createCategory: asyncHander(async (req, res) => {
        try {
          const newCategory = await Category.create(req.body);
          res.json(newCategory);
        } catch (error) {
          throw new Error(error);
        }
      }),
    getAllCategory: asyncHander(async (req, res) => {
        try{
            const findCategory = await Category.find();
            res.json(findCategory);
        } catch(error){
            throw new Error(error);
        }
      }),
    
      getOneCategory: asyncHander(async (req, res) => {
        const { id } = req.params;

        try {
            const findCategory = await Category.findById(id);

            if (!findCategory) {
                return res.status(404).json({ result: 'fail', message: 'Category not found' });
            }
            const populatedCategory = await Course.find({ category: findCategory._id });

            res.json({ category: findCategory, courses: populatedCategory });
        } catch (error) {
            throw new Error(error);
        }
    }),

};
