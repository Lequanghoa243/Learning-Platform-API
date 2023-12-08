const Category = require('../models/category.model');
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
        const {id} = req.params;
        console.log(id);
        try{
            const findCategory = await Category.findById(id);
            res.json(findCategory);
        } catch(error){
            throw new Error(error);
        }
      }),
};
