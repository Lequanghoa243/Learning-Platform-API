const lessonService = require('../services/lesson.service');
const {authMiddleware, isAdmin} = require('../middleware/authmiddleware')

module.exports = function (app) {
    app.post('/lesson/create', authMiddleware, isAdmin,lessonService.createLesson);
     /**
     * @api {POST} /Lesson/create Create One Lesson
     * @apiVersion 0.0.0
     * @apiName Create Lesson
     * @apiGroup Lesson
     * @apiPermission User with role Admin
     *
     * @apiDescription Create one Lesson for course
     *
     * @apiBody {String} title
     * @apiBody {String} description
     * @apiBody {String} videoURL
     * @apiBody {String} sequence
     * @apiBody {String} course
     *
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/Lesson/create
     * 
     * @apiSuccess {Json} Lesson the created Lesson
     * @apiSuccess {String} title
     * @apiSuccess {String} description
     * @apiSuccess {String} videoURL
     * @apiSuccess {String} sequence
     * @apiSuccess {String} course
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     * 
     * 
     * @apiSuccessExample Success-Response:
     * {
     *      "title": "Introduction to the Java Course",
     *      "description": "This lesson covers the basics of the course.",
    *       "videoURL": "https://example.com/in3tro-video.mp4",
    *       "sequence": 2,
    *       "course": "65772464288fef940490a95b",
    *       "_id": "657725fbb9465c59933d2dfa",
    *       "createdAt": "2023-12-11T15:08:43.371Z",
    *       "updatedAt": "2023-12-11T15:08:43.371Z",
    *       "__v": 0
    * }
    *
     * @apiError ErrorCreatingLesson
     *
     * @apiErrorExample Error-Response:
    * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error creating lesson",
    *     "data": {
    *         "index": 0,
    *         "code": 11000,
    *         "keyPattern": {
    *             "title": 1
    *         },
    *         "keyValue": {
    *             "title": "Introduction to the Java Course"
    *         }
    *     },
    *     "all": "Internal Server Error"
* }

     */
    app.get('/lesson/:id',authMiddleware,lessonService.getOneLesson);
    /**
     * @api {GET} /lesson/:id Get One lesson
     * @apiVersion 0.0.0
     * @apiName get One lesson
     * @apiGroup Lesson
     * @apiPermission Every type of user
     *
     * @apiDescription Get one lesson
     *
     * @apiParam {string} id ID of lesson, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/lesson/65770ab89f0dbfabc63efc2b
     *
     * @apiSuccess {Json} Json object of lesson
     * @apiSuccess {String} title
     * @apiSuccess {String} description
     * @apiSuccess {String} videoURL
     * @apiSuccess {String} sequence
     * @apiSuccess {String} course
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
     * @apiSuccessExample Success-Response:
     * {
     *      "title": "Introduction to the Java Course",
     *      "description": "This lesson covers the basics of the course.",
     *       "videoURL": "https://example.com/in3tro-video.mp4",
     *       "sequence": 2,
     *       "course": "65772464288fef940490a95b",
     *       "_id": "657725fbb9465c59933d2dfa",
     *       "createdAt": "2023-12-11T15:08:43.371Z",
     *       "updatedAt": "2023-12-11T15:08:43.371Z",
     *       "__v": 0
     * }
     *
     * @apiError ErrorGetOnelesson Internal server error
     * @apiError lessonNotFound No matched lesson id found
     *
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error fetching lesson by ID",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"lesson\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
     *  @apiErrorExample Error-Response-No-lesson-Found:
     *     {
     *   "result": "fail",
     *   "code": "404",
     *   "error": "lesson not found",
     *   "all": "Not Found"
     *   }
     * 
     */
    app.get('/lesson/course/:id',lessonService.getAllLesson);
        /**
     * @api {GET} /lesson/:id Get All lesson
     * @apiVersion 0.0.0
     * @apiName get All lesson
     * @apiGroup Lesson
     * @apiPermission Every type of user
     *
     * @apiDescription Get All lesson of a course
     *
     * @apiParam {string} id ID of course, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/lesson/course/65772464288fef940490a95b
     *
     * @apiSuccess {Json} Lesson-Array Array of Json object of lesson
     * @apiSuccess {String} title
     * @apiSuccess {String} description
     * @apiSuccess {String} videoURL
     * @apiSuccess {String} sequence
     * @apiSuccess {String} course
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
     *
     * @apiSuccessExample Success-Response:
     * {
     *     "_id": "6577250f3201738008e39659",
     *     "title": "Introduction to the Java Course",
     *     "description": "This lesson covers the basics of the course.",
     *     "videoURL": "https://example.com/in3tro-video.mp4",
     *     "duration": 120,
     *     "sequence": 2,
     *     "course": "65772464288fef940490a95b",
     *     "createdAt": "2023-12-11T15:04:47.015Z",
     *     "updatedAt": "2023-12-11T15:04:47.015Z",
     *     "__v": 0
     * }
     *
     * @apiError ErrorGetAlllesson Internal server error
     * @apiError CourseNotFound No matched Course id found
     *
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error fetching all lesson of course",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"lesson\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
     *  @apiErrorExample Error-Response-No-Course-Found:
     *     {
     *      "result": "fail",
     *      "code": "404",
     *      "error": "Course not found",
     *      "all": "Not Found"
     *   }
     * 
     */    
}