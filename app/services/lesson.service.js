const  Lesson = require('../models/lesson.model');
const Course = require('../models/courses.model');
const asyncHander = require('express-async-handler');

module.exports = {
    createLesson: asyncHander(async (req, res) => {
      const course = req.body.course; 
    try {
        const newLesson = await Lesson.create(req.body);
        await Course.findByIdAndUpdate(course, {  $push: { lessonlist: newLesson._id }, $inc: { NumberofLesson: 1 } });

        res.json(newLesson);
    } catch (error) {
        throw new Error(error);
    }
      }),

      getOneLesson: asyncHander(async function (req, res) {
        const lessonId = req.params.id;
        const userId = req.user._id; // Assuming you're using authentication middleware to get the user ID
    
        try {
            // Find the user and populate the courselist and currentLesson
            const user = await User.findById(userId).populate({
                path: 'courselist.course',
                model: 'Course',
                populate: {
                    path: 'currentLesson',
                    model: 'Lesson',
                },
            });
    
            // Iterate through courselist to find the lesson
            let learningProgress = null;
            user.courselist.forEach((course) => {
                if (course.currentLesson && course.currentLesson._id.toString() === lessonId) {
                    learningProgress = {
                        userId: userId,
                        courseId: course.course._id,
                        lessonId: course.currentLesson._id,
                        progress: 'In Progress', // You can customize this based on your logic
                    };
                }
            });
    
            res.json(learningProgress);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),
    
   
   getAllLesson: asyncHander(async function (req, res) {
        const courseId = req.params.id;
        try {
            const allLessonsOfCourse = await Lesson.find({ course: courseId });
            res.json(allLessonsOfCourse);
        } catch (error) {
            throw new Error(error);
        }
    }),

   
};
