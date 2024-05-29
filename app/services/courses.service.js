const Course = require('../models/courses.model');
const Lesson = require('../models/lesson.model');
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
      throw new Error(error)
    }
  }),
  addToWishlist : asyncHandler(async (req, res) => {
    const { _id } = req.body;
    const { courseId } = req.body;
    try {
      const user = await User.findById(_id);
      const alreadyadded = user.wishlist.find((id) => id.toString() === courseId);
      if (alreadyadded) {
        let user = await User.findByIdAndUpdate(
          _id,
          {
            $pull: { wishlist: courseId },
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
            $push: { wishlist: courseId },
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
    updateCourse: asyncHandler(async (req, res) => {
      const { id } = req.params;
      try {
      const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if(!updatedCourse) return sendError(res, '404', 'Course not found', 404, 'Not Found');
      res.json(updatedCourse);
    } catch (error) {
      sendError(res, '500', 'Error updating Course', 500, 'Internal Server Error', error);
      throw new Error(error);
    }
  }),

  deleteCourse: asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if(!deletedCourse) return sendError(res, '404', 'Course not found', 404, 'Not Found');
    res.json(deletedCourse);
  } catch (error) {
      sendError(res, '500', 'Error deleting Course', 500, 'Internal Server Error', error);
    throw new Error(error);
  } 
  }),

     getAllCourse: asyncHandler(async function (req, res) {
    try {
      let query = {};

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query.title = searchRegex;
      }

      const courses = await Course.find(query);
      res.json(courses);
    } catch (error) {
      sendError(res, '500', 'Error fetching all courses', 500, 'Internal Server Error', error);
    }
  }),

  getOneCourse: asyncHandler(async function (req, res) {
    const { id } = req.params;
    try {
    const findCourse = await Course.findById(id);

      res.json(findCourse);
    } catch (error) {
      sendError(res, '500', 'Error fetching course by ID', 500, 'Internal Server Error', error);
    }
  }),
  getPercentage: asyncHandler(async function (req, res) {
    try {
      const { id } = req.body;
      const userId = req.body; 
      const findCourse = await Course.findById(id).populate("ratings.postedby");
      if (!findCourse) {
        return sendError(res, '404', 'Course not found', 404, 'Not Found');
      }

      // Only look for progress if the course exists
      const progress = await Progress.findOne({ user: userId, course: id });

      const response = {
        progressPercentage: progress ? progress.percentage : -1  
      };

      res.json(response);
    } catch (error) {
      sendError(res, '500', 'Error fetching percentage', 500, 'Internal Server Error', error);
    }
  }),

  rating: asyncHandler(async function (req, res) {
    const { _id } = req.body;
    const { star, courseId, comment } = req.body;
    const course = await Course.findById(courseId);
    try {

        
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
    const { userId, courseId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const alreadyEnrolled = user.courselist.includes(courseId);
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        user.courselist.push(courseId);
        await user.save();
        res.json(user);
    } catch (error) {
        sendError(res, '500', 'Error enrolling in the course', 500, 'Internal Server Error', error);
    }
  }),

 getAllLesson: asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  try {
    const findCourse = await Course.findById(courseId);

    if (!findCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const allLessons = await Lesson.find({ course: findCourse.title });
    res.json(allLessons);
  } catch (error) {

    res.status(500).json({ message: 'Error fetching all lessons of the course' });
  }
  }),
};
 
