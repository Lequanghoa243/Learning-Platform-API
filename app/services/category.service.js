const Category = require('../models/category.model');
const Course = require('../models/courses.model');
const asyncHandler = require('express-async-handler');
const { sendError } = require('../utils/restware'); 

module.exports = {
    createCategory: asyncHandler(async (req, res) => {
        try {
            const newCategory = await Category.create(req.body);
            res.json(newCategory);
        } catch (error) {
            sendError(res, '500', 'Error creating category', 500, 'Internal Server Error', error);
            throw new Error(error);
        }
    }),

    updateCategory:asyncHandler(async (req, res) => {
       const { id } = req.params;
       try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if(!updatedCategory) return sendError(res, '404', 'Category not found', 404, 'Not Found');
        res.json(updatedCategory);
      } catch (error) {
        sendError(res, '500', 'Error updating category', 500, 'Internal Server Error', error);
        throw new Error(error);
      }
    }),

   deleteCategory:asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if(!deletedCategory) return sendError(res, '404', 'Category not found', 404, 'Not Found');
      res.json(deletedCategory);
    } catch (error) {
        sendError(res, '500', 'Error deleting category', 500, 'Internal Server Error', error);
      throw new Error(error);
    } 
    }),



    getAllCategory: asyncHandler(async (req, res) => {
        try {
            const findCategory = await Category.find();
            res.json(findCategory);
        } catch (error) {
            sendError(res, '500', 'Error fetching all categories', 500, 'Internal Server Error', error);
            throw new Error(error);
        }
    }),

    getOneCategory: asyncHandler(async (req, res) => {
        const { id } = req.params;

        try {
            const findCategory = await Category.findById(id);

            if (!findCategory) {
                return sendError(res, '404', 'Category not found', 404, 'Not Found');
            }

            const populatedCategory = await Course.find({ category: findCategory._id });

            res.json({ category: findCategory, courses: populatedCategory });
        } catch (error) {
            sendError(res, '500', 'Error fetching category by ID', 500, 'Internal Server Error', error);
            throw new Error(error);
        }
    }),
};
