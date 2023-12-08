
const courseService = require('../services/courses.service');
const authMinddleware = require('../middleware/authmiddleware');

module.exports = function (app) {
     /**
     * @api {GET} /course/ Get All Courses 
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Course
     * @apiPermission Every type of user
     *
     * @apiDescription Get All Courses                                                                                                                                                                                                                                                                                                                                                                                         
     *
     * @apiParam {string} Name Name of the course, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/course/web-design
     *
     *
     * @apiSuccess {String} Name Title of course
     *
     * @apiSuccessExample Success-Response:
     *     course: web design
     * @apiError invalid-course the course is not exist in the database
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "result": "fail",
     *       "message": "invalid course"
     *     }
     */
    app.post('/course/create', courseService.createCourse);
    app.put('/course/rating',authMinddleware,courseService.rating);
    app.get('/course', courseService.getAllCourse);
    app.post('/course/enrollcourse',authMinddleware,courseService.enrollCourse);
    app.get('/course/:id', courseService.getOneCourse);
 
    
    
    

};
