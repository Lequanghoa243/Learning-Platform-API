const Course = require('../models/courses.model');
const User = require('../models/users.model');
const asyncHander = require('express-async-handler');
const slugify = require("slugify");

module.exports = {
    createCourse: asyncHander(async (req, res) => {
        try {
            if (req.body.title) {
                req.body.slug = slugify(req.body.title);
              }
          const newCourse = await Course.create(req.body);
          res.json(newCourse);
        } catch (error) {
          throw new Error(error);
        }
      }),

    getAllCourse: asyncHander(async function (req, res) {
        try {
            const getAllCourse = await Course.find(req.query);
            res.json(getAllCourse);
          } catch (error) {
            throw new Error(error);
          }
    }),
    
   
    getOneCourse: asyncHander(async function (req, res) {
        const {id} = req.params;
        try{
            const findProduct = await Course.findById(id);
            res.json(findProduct);
        } catch(error){
            throw new Error(error);
        }
    }),
    
    
    searchCourse: function(req, res) {
    }
    ,
    

    getOneLesson: async function(req, res) {
       
    },

    enrollCourse:asyncHander(async function (req, res) {
   
    }),
};
