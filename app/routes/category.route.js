const categoryService = require('../services/category.service');
const {authMiddleware, isAdmin} = require('../middleware/authmiddleware');

module.exports = function (app) {
    app.post('/category/create', authMiddleware, isAdmin ,categoryService.createCategory);
     /**
     * @api {POST} /category/create Create One Category
     * @apiVersion 0.0.0
     * @apiName Create Category
     * @apiGroup Category
     * @apiPermission User with role Admin
     *
     * @apiDescription Create one category for course
     *
     * @apiBody {String} Title Title of the category
     *
     * @apiExample Example usage:
     *      curl -i http://localhost:3000/category/create
     * @apiSuccess {String} title title of the created category
     * @apiSuccess {String} id id of the created category
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     * 
     *
     * @apiSuccessExample Success-Response:
     *     {
     *           "title": "Data analysis",
     *           "_id": "65770ab89f0dbfabc63efc2b",
     *           "createdAt": "2023-12-11T13:12:24.970Z",
     *           "updatedAt": "2023-12-11T13:12:24.970Z",
     *           "__v": 0
     *     }
     *
     * @apiError ErrorCreatingCategory Error occur when creating Category
     *
     * @apiErrorExample Error-Response:
     * {
     *     "result": "fail",
     *     "code": "500",
     *     "error": "Error creating category",
     *     "data": {
     *         "index": 0,
     *         "code": 11000,
     *         "keyPattern": {
     *             "title": 1
     *         },
     *         "keyValue": {
     *             "title": "Programming language"
     *         }
     *     },
     *     "all": "Internal Server Error"
     * }

     */
    app.get('/category',categoryService.getAllCategory);
    /**
     * @api {GET} /category Get All Category
     * @apiVersion 0.0.0
     * @apiName get All Category
     * @apiGroup Category
     * @apiPermission Every type of user
     *
     * @apiDescription Get All Category
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/category
     *
     * @apiSuccess {Json} Json Object all the category
     * @apiSuccess {String} id Id Object all the category
     * @apiSuccess {String} title Title Object all the category
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     *
     * @apiSuccessExample Success-Response:
     *    [
     *           {
     *               "_id": "6571e4758e1ac9a00c5036f3",
     *               "title": "Front End",
     *               "createdAt": "2023-12-07T15:27:49.585Z",
     *               "updatedAt": "2023-12-07T15:27:49.585Z",
     *               "__v": 0
     *           },
     *           {
     *               "_id": "65768a84711726ed1a9ffbfe",
     *               "title": "Back End",
     *               "createdAt": "2023-12-11T04:05:24.640Z",
     *              "updatedAt": "2023-12-11T04:05:24.640Z",
     *               "__v": 0
     *           }
     *    ]
     *
     * @apiError ErrorGettingAllCategory Error when get all category
     *
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error fetching all categories",
     *       "all": "Internal Server Error"
     *     }
     */
    app.get('/category/:id',categoryService.getOneCategory);
    /**
     * @api {GET} /category/:id Get One Category
     * @apiVersion 0.0.0
     * @apiName get One Category
     * @apiGroup Category
     * @apiPermission Every type of user
     *
     * @apiDescription Get one Category
     *
     * @apiParam {string} id ID of Category, on params
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3000/category/65770ab89f0dbfabc63efc2b
     *
     * @apiSuccess {String} Title Title of category
     * @apiSuccess {String} ID Id of the category
     * @apiSuccess {Timestamp} createdAt creation time
     * @apiSuccess {Timestamp} updatedAt update time
     * @apiSuccessExample Success-Response:
     *     {
     *           "title": "Data analysis",
     *           "_id": "65770ab89f0dbfabc63efc2b",
     *           "createdAt": "2023-12-11T13:12:24.970Z",
     *           "updatedAt": "2023-12-11T13:12:24.970Z",
     *           "__v": 0
     *     }
     *
     * @apiError ErrorGetOneCategory Internal server error
     * @apiError CategoryNotFound No matched category id found
     *
     * @apiErrorExample Error-Response:
     *     {
     *       "result": "fail",
     *       "code": "500",
     *       "error": "Error fetching category by ID",
     *       "data": {
     *       "stringValue": "\"6571e4758e1ac9a00c5036f31\"",
     *       "valueType": "string",
     *       "kind": "ObjectId",
     *       "value": "6571e4758e1ac9a00c5036f31",
     *       "path": "_id",
     *       "reason": {},
     *       "name": "CastError",
     *       "message": "Cast to ObjectId failed for value \"6571e4758e1ac9a00c5036f31\" (type string) at path \"_id\" for model \"Category\""
     *        },
     *       "all": "Internal Server Error"
     *     }
     * 
     *  @apiErrorExample Error-Response-No-Category-Found:
     *     {
     *   "result": "fail",
     *   "code": "404",
     *   "error": "Category not found",
     *   "all": "Not Found"
     *   }
     * 
     */
    
}