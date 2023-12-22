const lessonService = require('../services/lesson.service');
const {authMiddleware, isAdmin} = require('../middleware/authmiddleware')

module.exports = function (app) {
    app.get('/lesson', lessonService.getAllLesson);
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

app.put("/lesson/:id", authMiddleware, isAdmin, lessonService.updateLesson);
/**
 * @api {PUT} /Lesson/:id Update One Lesson
 * @apiVersion 0.0.0
 * @apiName Update Lesson
 * @apiGroup Lesson
 * @apiPermission User with role Admin
 *
 * @apiDescription Update details of a specific Lesson
 *
 * @apiParam {String} id Lesson's unique ID
 *
 * @apiBody {String} [title]
 * @apiBody {String} [description]
 * @apiBody {String} [videoURL]
 * @apiBody {String} [sequence]
 * @apiBody {String} [course]
 *
 * @apiExample Example usage:
 *      curl -i -X PUT http://localhost:3000/Lesson/657725fbb9465c59933d2dfa
 * 
 * @apiSuccess {Json} Lesson the updated Lesson
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
 *      "title": "Introduction to the Java Course (Updated)",
 *      "description": "This lesson covers the basics of the course with updates.",
 *      "videoURL": "https://example.com/updated-intro-video.mp4",
 *      "sequence": 2,
 *      "course": "65772464288fef940490a95b",
 *      "_id": "657725fbb9465c59933d2dfa",
 *      "createdAt": "2023-12-11T15:08:43.371Z",
 *      "updatedAt": "2023-12-12T10:15:32.512Z",
 *      "__v": 1
 * }
 *
 * @apiError ErrorUpdatingLesson
 *
 * @apiErrorExample Error-Response:
 * {
 *     "result": "fail",
 *     "code": "404",
 *     "error": "Lesson not found",
 *     "data": null,
 *     "all": "Not Found"
 * }
 */


app.delete("/lesson/:id", authMiddleware, isAdmin, lessonService.deleteLesson);
/**
 * @api {DELETE} /Lesson/:id Delete One Lesson
 * @apiVersion 0.0.0
 * @apiName Delete Lesson
 * @apiGroup Lesson
 * @apiPermission User with role Admin
 *
 * @apiDescription Delete a specific Lesson
 *
 * @apiParam {String} id Lesson's unique ID
 *
 * @apiExample Example usage:
 *      curl -i -X DELETE http://localhost:3000/Lesson/657725fbb9465c59933d2dfa
 * * 
 * @apiSuccess {Json} Lesson the updated Lesson
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
 *      "title": "Introduction to the Java Course (Updated)",
 *      "description": "This lesson covers the basics of the course with updates.",
 *      "videoURL": "https://example.com/updated-intro-video.mp4",
 *      "sequence": 2,
 *      "course": "65772464288fef940490a95b",
 *      "_id": "657725fbb9465c59933d2dfa",
 *      "createdAt": "2023-12-11T15:08:43.371Z",
 *      "updatedAt": "2023-12-12T10:15:32.512Z",
 *      "__v": 1
 * }
 * @apiError ErrorDeletingLesson
 *
 * @apiErrorExample Error-Response:
 * {
 *     "result": "fail",
 *     "code": "404",
 *     "error": "Lesson not found",
 *     "data": null,
 *     "all": "Not Found"
 * }
 */

    app.get('/lesson/:id',lessonService.getOneLesson);
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
    }