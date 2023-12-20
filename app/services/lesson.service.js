const Lesson = require('../models/lesson.model');
const Course = require('../models/courses.model');
const asyncHandler = require('express-async-handler');
const { sendError } = require('../utils/restware');

module.exports = {
  createLesson: asyncHandler(async (req, res) => {
    const course = req.body.course.title;
    try {
      const newLesson = await Lesson.create(req.body);
      await Course.findByIdAndUpdate(course, { $push: { lessonlist: newLesson._id }, $inc: { NumberofLesson: 1 } });

      res.json(newLesson);
    } catch (error) {
      sendError(res, '500', 'Error creating lesson', 500, 'Internal Server Error', error);
      throw new Error(error);
    }
  }),

  getAllLesson: asyncHandler(async (req, res) => {
    
    try {
      const newLesson = await Lesson.find().populate('course');
      res.json(newLesson);
    } catch (error) {
      sendError(res, '500', 'Error creating lesson', 500, 'Internal Server Error', error);
      throw new Error(error);
    }
  }),

  updateLesson: asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
     const updatedLesson = await Lesson.findByIdAndUpdate(id, req.body, {
       new: true,
     });
     if(!updatedLesson) return sendError(res, '404', 'Lesson not found', 404, 'Not Found');
     res.json(updatedLesson);
   } catch (error) {
     sendError(res, '500', 'Error updating Lesson', 500, 'Internal Server Error', error);
     throw new Error(error);
   }
 }),

 deleteLesson: asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(id);

    if (!deletedLesson) {
      return sendError(res, '404', 'Lesson not found', 404, 'Not Found');
    }

    await Course.findByIdAndUpdate(deletedLesson.course, { $inc: { NumberofLesson: -1 } });
    await Course.findByIdAndUpdate(deletedLesson.course, { $pull: { lessonlist: deletedLesson._id } });

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    sendError(res, '500', 'Error deleting lesson', 500, 'Internal Server Error', error);
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

};
