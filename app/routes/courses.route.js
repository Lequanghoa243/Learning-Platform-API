
const courseService = require('../services/courses.service');
const {authMiddleware, isAdmin} = require('../middleware/authmiddleware')

module.exports = function (app) {
    app.post('/course/create',authMiddleware,isAdmin, courseService.createCourse);
    /**
     * @api {POST} /course/create Create One course
     * @apiVersion 0.0.0
     * @apiName Create course
     * @apiGroup Course
     * @apiPermission User with role Admin
     *
     * @apiDescription Create one course 
     *
     * @apiBody {String} title title of the course
     * @apiBody {String} description description of the course
     * @apiBody {String} course course id of the course
     * @apiBody {String} learningTime learningTime of the course
     * @apiBody {String} image image of the course
     * 
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/course/create
     * 
     * 
     * @apiSuccess {String} Title title of the course
     * @apiSuccess {String} slug slug of the course
     * @apiSuccess {String} description description of the course
     * @apiSuccess {String} LearningTime LearningTime of the course
     *
     * @apiSuccessExample Success-Response:
     * {
     *     "title": "Javasript from Zero1",
     *     "slug": "javasript-from-zero1",
     *     "description": "A beginner-friendly course that takes you from ground zero to confidently mastering the essentials of JavaScript programming.1",
     *     "course": "6577243c288fef940490a958",
     *     "courselist": [],
     *     "Numberofcourse": 0,
     *     "totalrating": "0",
     *     "_id": "65772fbd60179f767ab9664b",
     *     "ratings": [],
     *     "createdAt": "2023-12-11T15:50:21.145Z",
     *     "updatedAt": "2023-12-11T15:50:21.145Z",
     *     "__v": 0
     * }

     *
     * @apiError ErrorCreatingcourse
     *
     * {
     *     "result": "fail",
     *     "code": "500",
     *     "error": "Error creating course",
     *     "data": {
     *         "index": 0,
     *         "code": 11000,
     *         "keyPattern": {
     *             "description": 1
     *         },
     *         "keyValue": {
     *             "description": "A beginner-friendly course that takes you from ground zero to confidently mastering the essentials of JavaScript programming.1"
     *         }
     *     },
     *     "all": "Internal Server Error"
     * }
     */
    app.put('/course/rating',authMiddleware ,courseService.rating);
        /**
     * @api {PUT} /course/rating Rating course
     * @apiVersion 0.0.0
     * @apiName Rating
     * @apiGroup Course
     * @apiPermission Log in User 
     *
     * @apiDescription User rating a course
     *
     * @apiBody {String} Star star give to the course
     * @apiBody {String} Comment comment of user
     * @apiBody {String} CourseId the course that being comment

     * @apiExample Example usage:
     *      curl -i http://localhost:3000/course/rating
     * 
     * @apiSuccess {String} Title title of the course
     * @apiSuccess {String} slug slug of the course
     * @apiSuccess {String} description description of the course
     * @apiSuccess {String} LearningTime LearningTime of the course
     * @apiSuccess {Json} Rating the ratings of course
     * 
     *
     * @apiSuccessExample Success-Response:
     * {
    *     "_id": "65772464288fef940490a95b",
    *     "title": "Javasript from Zero",
    *     "slug": "javasript-from-zero",
    *     "description": "A beginner-friendly course that takes you from ground zero to confidently mastering the essentials of JavaScript programming.",
    *     "course": "6577243c288fef940490a958",
    *     "courselist": [
    *         "6577250f3201738008e39659",
    *         "657725fbb9465c59933d2dfa",
    *         "6577323f184ffadb9fe4cb61",
    *         "65773243184ffadb9fe4cb66",
    *         "657732505dd5c3024a56faaa",
    *         "6577325e2615694f54dff5f1",
    *         "657732d37746f00eaf5979fc",
    *         "6577332b489541c6c5a9fbbb"
    *     ],
    *     "Numberofcourse": 8,
    *     "totalrating": "0",
    *     "ratings": [
    *         {
    *             "star": 4,
    *             "comment": "so good",
    *             "postedby": "65768a66711726ed1a9ffbf8",
    *             "_id": "65773705d60213baa44307a3"
    *         }
    *     ],
    *     "createdAt": "2023-12-11T15:01:56.481Z",
    *     "updatedAt": "2023-12-11T16:21:25.959Z",
    *     "__v": 0
    * }
    * 
     * @apiError ErrorRating
     * 
     *@apiErrorExample Error-Response:
     * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error rating course",
    *     "data": {
    *         "stringValue": "\"65772464288fef940490a95b1\"",
    *         "valueType": "string",
    *         "kind": "ObjectId",
    *         "value": "65772464288fef940490a95b1",
    *         "path": "_id",
    *         "reason": {},
    *         "name": "CastError",
    *         "message": "Cast to ObjectId failed for value \"65772464288fef940490a95b1\" (type string) at path \"_id\" for model \"Course\""
    *     },
    *     "all": "Internal Server Error"
    * }

     */
    app.get('/course', courseService.getAllCourse);
    /**
     * @api {GET} /course Get All course
     * @apiVersion 0.0.0
     * @apiName get All course
     * @apiGroup Course
     * @apiPermission Every type of user
     *
     * @apiDescription Get All course
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/course
     *
     * @apiSuccess {Json} Courses The array object json
     *
     * @apiSuccessExample Success-Response:
    * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error fetching course by ID",
    *     "data": {
    *         "stringValue": "\"65772464288fef940490a95a1\"",
    *         "valueType": "string",
    *         "kind": "ObjectId",
    *         "value": "65772464288fef940490a95a1",
    *         "path": "_id",
    *         "reason": {},
    *         "name": "CastError",
    *         "message": "Cast to ObjectId failed for value \"65772464288fef940490a95a1\" (type string) at path \"_id\" for model \"Course\""
    *     },
    *     "all": "Internal Server Error"
    * }
     * @apiError ErrorGettingAllcourse
     *
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error fetching all courses",
     *       "all": "Internal Server Error"
     *     }
     */
    app.post('/course/enrollcourse',authMiddleware,courseService.enrollCourse);
    /**
     * @api {POST} /course/enrollcourse Enroll Course
     *
     * @apiVersion 0.0.0
     * @apiName Enroll Course
     * @apiGroup Course
     * @apiPermission Log in User
     *
     * @apiDescription Enroll for a course
     *
     * @apiBody {String} courseId
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/course/enrollcourse
     * 
     * 
     * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     *
     * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "admin",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [
    *         "6575c68e0a4b217f1f106158"
    *     ],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-11T16:37:33.510Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjMxMTY0NiwiZXhwIjoxNzAyMzk4MDQ2fQ.PWmhOoRWyND3IVw5eZ27bRj8iNs_vQ6UgB9dBumchOY"
    * }
    *
    *
    * @apiError ErrorCreatingcourse
    * 
    * @apiErrorExample Error-Response:
    * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error enrolling in the course",
    *     "data": {
    *         "stringValue": "\"6575c68e0a4b217f11f106158\"",
    *         "valueType": "string",
    *         "kind": "ObjectId",
    *         "value": "6575c68e0a4b217f11f106158",
    *         "path": "courselist",
    *         "reason": {},
    *         "name": "CastError",
    *         "message": "Cast to ObjectId failed for value \"6575c68e0a4b217f11f106158\" (type string) at path \"courselist\" because of \"BSONError\""
    *     },
    *     "all": "Internal Server Error"
    * }
    */

    app.get('/course/:id', courseService.getOneCourse);
    /**
     * @api {GET} /course/:id Get One course
     * @apiVersion 0.0.0
     * @apiName get One course
     * @apiGroup Course
     * @apiPermission Every type of user
     *
     * @apiDescription Get one course
     *
     * @apiParam {string} id ID of course, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/course/65770ab89f0dbfabc63efc2b
     *
     * @apiSuccess {String} Title title of the course
     * @apiSuccess {String} slug slug of the course
     * @apiSuccess {String} description description of the course
     * @apiSuccess {String} LearningTime LearningTime of the course
     *
     *
     * @apiSuccessExample Success-Response:
     * {
     *     "_id": "65772464288fef940490a95b",
     *     "title": "Javasript from Zero",
     *     "slug": "javasript-from-zero",
     *     "description": "A beginner-friendly course that takes you from ground zero to confidently mastering the essentials of JavaScript programming.",
     *     "course": "6577243c288fef940490a958",
     *     "lessonlist": [
     *         "6577250f3201738008e39659",
     *         "657725fbb9465c59933d2dfa",
     *         "6577323f184ffadb9fe4cb61",
     *         "65773243184ffadb9fe4cb66",
     *         "657732505dd5c3024a56faaa",
     *         "6577325e2615694f54dff5f1",
     *         "657732d37746f00eaf5979fc",
     *         "6577332b489541c6c5a9fbbb"
     *     ],
     *     "NumberofLesson": 8,
     *     "totalrating": "4",
     *     "ratings": [
     *         {
     *             "star": 4,
     *             "comment": "so good",
     *             "postedby": "65768a66711726ed1a9ffbf8",
     *             "_id": "65773705d60213baa44307a3"
     *         }
     *     ],
     *     "createdAt": "2023-12-11T15:01:56.481Z",
     *     "updatedAt": "2023-12-11T16:21:25.968Z",
     *     "__v": 0
     * }
     *
     *
     * @apiError ErrorGetOnecourse Internal server error
     * @apiError courseNotFound No matched course id found
     *
     * 
     * @apiErrorExample Error-Response:
     * {
     *     "result": "fail",
     *     "code": "500",
     *     "error": "Error fetching course by ID",
     *     "data": {
     *         "stringValue": "\"65772464288fef940490a95a1\"",
     *         "valueType": "string",
     *         "kind": "ObjectId",
     *         "value": "65772464288fef940490a95a1",
     *         "path": "_id",
     *         "reason": {},
     *         "name": "CastError",
     *         "message": "Cast to ObjectId failed for value \"65772464288fef940490a95a1\" (type string) at path \"_id\" for model \"Course\""
     *     },
     *     "all": "Internal Server Error"
     * }
     *
     * 
     *  @apiErrorExample Error-Response-No-course-Found:
     *     {
     *   "result": "fail",
     *   "code": "404",
     *   "error": "course not found",
     *   "all": "Not Found"
     *   }
     * 
     */
 
};
