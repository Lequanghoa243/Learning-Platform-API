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
        let query = {};

        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query.title = searchRegex;
        }

        const getAllCourse = await Course.find(query);
        res.json(getAllCourse);
    } catch (error) {
        throw new Error(error);
    }

    }),
    
   
    getOneCourse: asyncHander(async function (req, res) {
        const {id} = req.params;
        try{
            const findCourse = await Course.findById(id);
            res.json(findCourse);
        } catch(error){
            throw new Error(error);
        }
    }),

    rating: asyncHander(async function (req, res) {
      const {_id} = req.user;
      const { star, courseId, comment } = req.body;
     try {
      const course = await Course.findById(courseId);
      let alreadyRated = course.ratings.find((userId)=> userId.postedby.toString() === _id.toString());
      if (alreadyRated){
        const updateRating = await Course.updateOne({
          ratings: {$elemMatch: alreadyRated}
        },{
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },{
          new: true,
        });
        res.json(updateRating);
      }
      else{
        const rateCourse = await Course.findByIdAndUpdate(courseId,{
          $push:{
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        });
        res.json(rateCourse);
      }
      
      const getallratings = await Course.findById(courseId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);

      let finalproduct = await Course.findByIdAndUpdate(
       courseId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );
      res.json(finalproduct);

     } catch (error) {
      throw new Error(error);
     }
      
  }),
    

    enrollCourse: asyncHander(async (req, res) => {
    const { _id } = req.user;
    const { courseId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.courselist.find((id) => id.toString() === courseId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { courselist: courseId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { courselist: courseId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
    }),
};