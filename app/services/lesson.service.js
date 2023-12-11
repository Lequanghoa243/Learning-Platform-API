const Lesson = require('../models/lesson.model');
const Course = require('../models/courses.model');
const asyncHandler = require('express-async-handler');
const { sendError } = require('../utils/restware');

module.exports = {
  createLesson: asyncHandler(async (req, res) => {
    const course = req.body.course;
    try {
      const newLesson = await Lesson.create(req.body);
      await Course.findByIdAndUpdate(course, { $push: { lessonlist: newLesson._id }, $inc: { NumberofLesson: 1 } });

      res.json(newLesson);
    } catch (error) {
      sendError(res, '500', 'Error creating lesson', 500, 'Internal Server Error', error);
      throw new Error(error);
    }
  }),

  getOneLesson: asyncHandler(async function (req, res) {
    const { id } = req.params;
    try {
      const findLesson = await Lesson.findById(id);

      if (!findLesson) {
        return sendError(res, '404', 'Lesson not found', 404, 'Not Found');
      }

      res.json(findLesson);
    } catch (error) {
      sendError(res, '500', 'Error fetching Lesson by ID', 500, 'Internal Server Error', error);
      throw new Error(error);
    }
  }),

  getAllLesson: asyncHandler(async function (req, res) {
    const courseId = req.params.id;
    try {
      const course = await Course.findById(courseId);
      const allLessonsOfCourse = await Lesson.find({ course: courseId });
      if(!course){
        return sendError(res, '404', 'Course not found', 404, 'Not Found');
      }
      res.json(allLessonsOfCourse);
    } catch (error) {
      sendError(res, '500', 'Error fetching all lessons of the course', 500, 'Internal Server Error', error);
      throw new Error(error);
    }
  }),

};
