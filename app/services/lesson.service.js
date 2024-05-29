const Lesson = require('../models/lesson.model');
const Course = require('../models/courses.model');
const asyncHandler = require('express-async-handler');
const { sendError } = require('../utils/restware');

module.exports = {
  createLesson: asyncHandler(async (req, res) => {
    const courseName = req.body.course; // Assuming title is the name of the course

try {
  const foundCourse = await Course.findOne({ title: courseName });

  if (!foundCourse) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const newLesson = await Lesson.create(req.body);
  await Course.findByIdAndUpdate(
    foundCourse.id,
    {
      $inc: { NumberofLesson: 1 }
    }
  );

  res.json(newLesson);
} catch (error) {
  sendError(res, '500', 'Error creating lesson', 500, 'Internal Server Error', error);
  throw new Error(error);
}

 }),

  getAllLesson: asyncHandler(async (req, res) => {
    
    try {
      const newLesson = await Lesson.find();
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
    const findCourse = await Course.findOne({title: deletedLesson.course})
    await Course.findByIdAndUpdate(findCourse, { $inc: { NumberofLesson: -1 } });

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    sendError(res, '500', 'Error deleting lesson', 500, 'Internal Server Error', error);
    throw new Error(error);
  }
}),

getOneLesson: asyncHandler(async function (req, res) {
  const { id } = req.params;
  const { _id } = req.body;
  try {
    const findLesson = await Lesson.findById(id);
    const course = await Course.findOne({ title: findLesson.course });

    if (!course) {
      return sendError(res, '404', 'Course not found', 404, 'Not Found');
    }
    if (!findLesson) {
      return sendError(res, '404', 'Lesson not found', 404, 'Not Found');
    }
    if (!_id) {
      return sendError(res, '400', 'User ID is required', 400, 'Bad Request');
  }
  let progress = await Progress.findOne({ user: _id, course: course._id });
  if (!progress) {
      progress = new Progress({ user: _id, course: course._id, percentage: 0 });  // Initialize with 0 percentage if new
      await progress.save();  // Make sure to save the newly created progress record
  }
    
    // Calculate new percentage
    const totalLessons = course.NumberofLesson;
    const sequence = findLesson.sequence;
    const calculatedPercentage = ( sequence / totalLessons) * 100;

    // Update progress if the new percentage is higher
    if (calculatedPercentage > progress.percentage) {
      progress.percentage = calculatedPercentage;
      await progress.save();
    }
    res.json(findLesson);
  } catch (error) {
    sendError(res, '500', 'Error fetching Lesson by ID', 500, 'Internal Server Error', error);
    throw new Error(error);
  }
}),

};
