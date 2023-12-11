const Course = require('../models/courses.model');
const User = require('../models/users.model');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { sendError } = require('../utils/restware');

module.exports = {
  createCourse: asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const newCourse = await Course.create(req.body);
      res.json(newCourse);
    } catch (error) {
      sendError(res, '500', 'Error creating course', 500, 'Internal Server Error', error);
    }
  }),

  getAllCourse: asyncHandler(async function (req, res) {
    try {
      let query = {};

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query.title = searchRegex;
      }

      const getAllCourse = await Course.find(query);
      res.json(getAllCourse);
    } catch (error) {
      sendError(res, '500', 'Error fetching all courses', 500, 'Internal Server Error', error);
    }
  }),

  getOneCourse: asyncHandler(async function (req, res) {
    const { id } = req.params;
    try {
      const findCourse = await Course.findById(id);

      if (!findCourse) {
        return sendError(res, '404', 'Course not found', 404, 'Not Found');
      }

      res.json(findCourse);
    } catch (error) {
      sendError(res, '500', 'Error fetching course by ID', 500, 'Internal Server Error', error);
    }
  }),

  rating: asyncHandler(async function (req, res) {
    const { _id } = req.user;
    const { star, courseId, comment } = req.body;
    try {
      const course = await Course.findById(courseId);
      let alreadyRated = course.ratings.find((userId) => userId.postedby.toString() === _id.toString());
      if (alreadyRated) {
        const updateRating = await Course.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
          },
          {
            new: true,
          }
        );
        res.json(updateRating);
      } else {
        const rateCourse = await Course.findByIdAndUpdate(
          courseId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postedby: _id,
              },
            },
          },
          {
            new: true,
          }
        );
        res.json(rateCourse);
      }

      const getallratings = await Course.findById(courseId);
      let totalRating = getallratings.ratings.length;
      let ratingsum = getallratings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);

      let finalproduct = await Course.findByIdAndUpdate(courseId, {
        totalrating: actualRating,
      }, { new: true });
      res.json(finalproduct);
    } catch (error) {
      sendError(res, '500', 'Error rating course', 500, 'Internal Server Error', error);
    }
  }),

  enrollCourse: asyncHandler(async (req, res) => {
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
      sendError(res, '500', 'Error enrolling in the course', 500, 'Internal Server Error', error);
    }
  }),
};
