const lessonService = require('../services/lesson.service');
const authMinddleware = require('../middleware/authmiddleware');

module.exports = function (app) {
    app.post('/lesson/create', lessonService.createLesson);
    app.get('/lesson/:id',authMinddleware,lessonService.getOneLesson);
    app.get('/lesson/course/:id',lessonService.getAllLesson);    
}