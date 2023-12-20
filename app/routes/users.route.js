const userService = require('../services/users.service');
const {authMiddleware, isAdmin} = require('../middleware/authmiddleware')

module.exports = function (app) {
    app.get("/user",authMiddleware, isAdmin,userService.getAllUser);
    app.post("/user/admin-login", userService.loginAdmin);
    /**
     * @api {POST} /user/admin-login Admin Log in
     *
     * @apiVersion 0.0.0
     * @apiName Admin Log in
     * @apiGroup User
     * @apiPermission All type of Users
     *
     * @apiDescription Log in as an administrator
     *
     * @apiBody {String} Email Email of Admin
     * @apiBody {String} password Password of Admin
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/admin-login
     * 
     * 
     * @apiSuccess {Json} admin Admin profile
     * @apiSuccess {String} _id Admin's unique ID
     * @apiSuccess {String} firstname Admin's first name
     * @apiSuccess {String} lastname Admin's last name
     * @apiSuccess {String} email Admin's email
     * @apiSuccess {String} mobile Admin's mobile number
     * @apiSuccess {String} role Admin's role (e.g., "admin")
     * @apiSuccess {Timestamp} createdAt Admin's creation time
     * @apiSuccess {Timestamp} updatedAt Admin's last update time
     * @apiSuccess {String} refreshToken Admin's refresh token (if available)
     *
     * @apiSuccessExample Success-Response:
     * {
     *    "_id": "65768a66711726ed1a9ffbf8",
     *    "firstname": "Admin",
     *    "lastname": "User",
     *    "email": "admin@example.com",
     *    "mobile": "1234",
     *    "role": "admin",
     *    "createdAt": "2023-12-11T04:04:54.215Z",
     *    "updatedAt": "2023-12-12T07:28:54.271Z",
     *    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     * }
     *
     *
     * @apiError ErrorUnauthorized Wrong admin email or password
     * @apiError Error-server Error when creating refresh token
     * @apiErrorExample Error-Response:
     *    {
     *       "msg": "Wrong admin email or password"    
     * }
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error logging in",
     *       "data": {
     *          "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *          "valueType": "string",
     *          "kind": "ObjectId",
     *          "value": "6571e4758e1ac9a00c5036f31",
     *          "path": "_id",
     *          "reason": {},
     *          "name": "CastError",
     *          "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"admin\""
     *       },
     *       "all": "Internal Server Error"
     *     }
     * 
     */
    
    app.get("/user/:id", authMiddleware, isAdmin, userService.getaUser);
    /**
     * @api {GET} /user/:id Get A User
     *
     * @apiVersion 0.0.0
     * @apiName Get a User
     * @apiGroup User
     * @apiPermission Admin
     *
     * @apiDescription View Profile of User
     *
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/profile
     * 
     * 
    * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     * @apiSuccess {Array} Courselist list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
    * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
    *
    * @apiError Error-server Error when creating refresh token
    * 
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error loging in",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"courselist\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
     */

    app.get("/user/all-user", authMiddleware, isAdmin, userService.getAllUser);
    /**
     * @api {GET} /user/all-user Get All Users
     *
     * @apiVersion 0.0.0
     * @apiName Get All Users
     * @apiGroup User
     * @apiPermission Admin
     *
     * @apiDescription Get a list of all users
     *
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/all-user
     * 
     * 
     * @apiSuccess {Array} users List of users with their profiles
     * @apiSuccess {String} _id User's unique ID
     * @apiSuccess {String} firstname User's first name
     * @apiSuccess {String} lastname User's last name
     * @apiSuccess {String} email User's email
     * @apiSuccess {String} mobile User's mobile number
     * @apiSuccess {String} role User's role (e.g., "user", "admin")
     * @apiSuccess {Array} courselist List of courses of the user
     * @apiSuccess {Array} completedLessons List of completed lessons by the user
     * @apiSuccess {Timestamp} createdAt User's creation time
     * @apiSuccess {Timestamp} updatedAt User's last update time
     * @apiSuccess {String} refreshToken User's refresh token (if available)
     *
     * @apiSuccessExample Success-Response:
     * [
     *    {
     *       "_id": "65768a66711726ed1a9ffbf8",
     *       "firstname": "hoa",
     *       "lastname": "quang",
     *       "email": "kiritoyukile23@gmail.com",
     *       "mobile": "1243",
     *       "role": "user",
     *       "courselist": [],
     *       "completedLessons": [],
     *       "createdAt": "2023-12-11T04:04:54.215Z",
     *       "updatedAt": "2023-12-12T07:28:54.271Z",
     *       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     *    },
     *    // ... additional user objects
     * ]
     *
     *
     * @apiError ErrorGettingAllUsers
     * 
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error retrieving user list",
     *       "data": null,
     *       "all": "Internal Server Error"
     *     }
     * 
     */
    
    app.get('/user/course-list',authMiddleware,userService.getCourseList);
    /**
     * @api {GET} /user/course-list Get Course List
     * @apiVersion 0.0.0
     * @apiName Get Course List
     * @apiGroup User
     * @apiPermission Log in User
     *
     * @apiDescription Get Course list of one User
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/user/course-list
     *
     * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     * @apiSuccess {Array} Courselist list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     * 
     * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
     *
     * @apiError ErrorUnauthorized Error when the access token is wrong
     * @apiError Error-server Error when the server is down
     * @apiErrorExample Error-Response:
    *    {
    *    "result": "fail",
    *    "code": "401",
    *    "error": "Not authorized, please login again",
    *    "all": "Unauthorized"
    * }
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error fetching courselist of user",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"courselist\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
    * 
    * 
    * 
     */
    app.post('/user/forgot-password-token',userService.forgotPasswordToken);
        /**
     * @api {POST} /user/forgot-password-token Forgot Passowrd Token
     *
     * @apiVersion 0.0.0
     * @apiName Forgot Passowrd Token
     * @apiGroup User
     * @apiPermission All type of Users
     *
     * @apiDescription Forgot Passowrd Token
     *
     * @apiBody {String} Email Email of User
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/forgot-password-token
     * 
     * 
     * @apiSuccess {String} Token Token for reset password through the email
     * 
     * @apiSuccessExample Success-Response:
    * {
    *    "abd951073cf04b9911ec33941801ecdd4e09d15904a032d4ab1af9705f7db8f6"
    * }
    *
    *
    * @apiError ErrorSendingToken Error occur when sending the token
    * 
    * @apiErrorExample Error-Response:
    * {
    * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error sending forgot password token",
    *     "data": {},
    *     "all": "Internal Server Error"
    * }
    */
    app.get('/user/refresh',userService.handleRefreshToken);
    /**
     * @api {GET} /user/refresh Create Refresh Token
     * @apiVersion 0.0.0
     * @apiName Create Refresh Token
     * @apiGroup User
     * @apiPermission Log in User
     *
     * @apiDescription Create Refresh Token
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/user/refresh
     *
     * @apiSuccess {String} RefreshToken NewRefreshToken in cookie
     *
     * @apiSuccessExample Success-Response:
    * {
    *    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDIzNjc4MzUsImV4cCI6MTcwMjYyNzAzNX0.LR2FftLLcBpiGfFRIlyhn-CdzHkeWOjkEm6VaV9LulY"
    * }
    *
     *
     * @apiError ErrorUnauthorized No refresh token match
     * @apiError Error-server Error when creating refresh token
     * @apiErrorExample Error-Response:
    *    {
    *    "result": "fail",
    *    "code": "401",
    *    "error": "Some thing wrong with refresh token",
    *    "all": "Unauthorized"
    * }
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error handling refresh token",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"courselist\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
     */
    app.put('/user/password',authMiddleware,userService.updatePassword);
            /**
     * @api {PUT} /user/password Update Password
     * @apiVersion 0.0.0
     * @apiName Update Password
     * @apiGroup User
     * @apiPermission Log in User 
     *
     * @apiDescription User Update Password
     *
     * @apiBody {String} Password Updated password of the user

     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/password
     * 
     * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     * @apiSuccess {Array} Courselist list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
    * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
    * 
     *@apiError ErrorRating Error occur when reset password
     *  
     *@apiErrorExample Error-Response:
     * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error reset course",
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
    app.post('/user/login',userService.login);
        /**
     * @api {POST} /user/login Log in
     *
     * @apiVersion 0.0.0
     * @apiName Log in
     * @apiGroup User
     * @apiPermission All type of Users
     *
     * @apiDescription Log in
     *
     * @apiBody {String} Email Email of User
     * @apiBody {String} password password of User
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/login
     * 
     * 
    * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     * @apiSuccess {Array} Courselist list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
    * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
    *
    * @apiError ErrorUnauthorized wrong account email or password
    * @apiError Error-server Error when creating refresh token
    * @apiErrorExample Error-Response:
    *    {
    *       "msg": "wrong account email or password"    
    * }
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error loging in",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"courselist\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
     */
    app.post('/user/register',userService.register);
            /**
     * @api {POST} /user/register Register
     *
     * @apiVersion 0.0.0
     * @apiName Register
     * @apiGroup User
     * @apiPermission All type of Users
     *
     * @apiDescription Register
     *
     * @apiBody {String} fname name of the user
     * @apiBody {String} lastname name of the user
     * @apiBody {String} email email of the user
     * @apiBody {String} mobile mobile of the user
     * @apiBody {String} password password of User
     * 
     * 
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/register
     * 
     * 
    * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     * @apiSuccess {Array} Courselist list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
    * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
    *
    * @apiError Error-server Error when register
     *@apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error when register, try again",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"courselist\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
     */
    app.get('/user/logout',userService.logout);
        /**
     * @api {GET} /user/logout Logout
     * @apiVersion 0.0.0
     * @apiName Logout
     * @apiGroup User
     * @apiPermission Log out User
     *
     * @apiDescription Logout
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/user/logout
     *
     * @apiSuccess {String} deleteRefreshToken delete refreshtoken in cookie
     *
     * @apiSuccessExample Success-Response:
    * {
    *    
    * }
    *
     * 
     * @apiError Error-server Error when creating refresh token
     * @apiError Error-no-refreshToken no refresh token on cokkie
     * @apiErrorExample Error-Response:
    * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error logging out",
    *     "data": {},
    *     "all": "Internal Server Error"
    * }

     * @apiErrorExample Error-Response:
     *     {
     *       "msg": "no refresh token on cookies".
     *     }
     * 
     */
    app.put('/user/edit-profile',authMiddleware,userService.updateUser);
          /**
     * @api {PUT} /user/edit-profile Update User
     * @apiVersion 0.0.0
     * @apiName Update User information
     * @apiGroup User
     * @apiPermission Log in User 
     *
     * @apiDescription User Update User information
     * 
     * @apiBody {String} fname name of the user
     * @apiBody {String} lastname name of the user
     * @apiBody {String} email email of the user
     * @apiBody {String} mobile mobile of the user
     * 

     * @apiExample Example usage:
     *      curl -i http://localhost:3000/user/edit-profile
     * 
     * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     * @apiSuccess {Array} Courselist list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
    * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
    * 
     *@apiError ErrorRating Error occur when edit profile
     *  
     *@apiErrorExample Error-Response:
     * {
    *     "result": "fail",
    *     "code": "500",
    *     "error": "Error reset course",
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
    app.post('/user/reset-password/:token',userService.resetPassword);
     /**
     * @api {GET} /user/reset-password/:token Reset password
     * @apiVersion 0.0.0
     * @apiName Reset password
     * @apiGroup User
     * @apiPermission  Log in User
     *
     * @apiDescription Reset password
     *
     * @apiParam {string} token the token to reset password, on params
     * @apiBody {string} password the updated password
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000//user/reset-password/65770ab89f0dbfabc63efc2b
     *
   * @apiSuccess {Json} user user and the course list
     * @apiSuccess {String} fname name of the user
     * @apiSuccess {String} lastname name of the user
     * @apiSuccess {String} email email of the user
     * @apiSuccess {String} mobile mobile of the user
     * @apiSuccess {Array} Courselist list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
    * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
     *
     * @apiError Error-Server Internal server error
     * @apiError TokenExpried Token is expried
     *
     * 
     * @apiErrorExample Error-Response:
     * {
     *     "result": "fail",
     *     "code": "500",
     *     "error": "Error reset password",
     *     "data": {
     *     },
     *     "all": "Internal Server Error"
     * }
     *
     *  @apiErrorExample Error-Response-Token-Expried:
     *     {
     *      "msg": " Token Expired, Please try again later"
     *      }
     * 
     */
    app.delete('/user/delete',authMiddleware,userService.deleteaUser);
     /**
     * @api {DELETE} /user/delete Delete Account
     * @apiVersion 0.0.0
     * @apiName Delete A User
     * @apiGroup User
     * @apiPermission  Log in User
     *
     * @apiDescription Delete Account
     *
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000//user/delete
     * @apiSuccess {Json} user deleted user and the course list
     * @apiSuccess {String} fname deleted name of the user
     * @apiSuccess {String} lastname deleted name of the user
     * @apiSuccess {String} email deleted email of the user
     * @apiSuccess {String} mobile deleted mobile of the user
     * @apiSuccess {Array} Courselist deleted list of courses of user
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
    * @apiSuccessExample Success-Response:
    * {
    *     "_id": "65768a66711726ed1a9ffbf8",
    *     "firstname": "hoa",
    *     "lastname": "quang",
    *     "email": "kiritoyukile23@gmail.com",
    *     "mobile": "1243",
    *     "role": "user",
    *     "password": "$2b$10$pOTt1KCRcwSifkhsEJPRcOUmjxa3m7fQhlsmW58VmLN8V.LxZukEq",
    *     "courselist": [],
    *     "completedLessons": [],
    *     "createdAt": "2023-12-11T04:04:54.215Z",
    *     "updatedAt": "2023-12-12T07:28:54.271Z",
    *     "__v": 0,
    *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzY4YTY2NzExNzI2ZWQxYTlmZmJmOCIsImlhdCI6MTcwMjM2NjEzNCwiZXhwIjoxNzAyNDUyNTM0fQ.aFeNiHbfqZGOvOX97G7iTNV5pRnW3qxa3MsVa69BmE8"
    * }
    *
     *
     * @apiError Error-Server Internal server error
     *
     * 
     * @apiErrorExample Error-Response:
     * {
     *     "result": "fail",
     *     "code": "500",
     *     "error": "Error update profile",
     *     "data": {
     *     },
     *     "all": "Internal Server Error"
     * }
     *
     * 
     */
    
}