module.exports = function (app) {
    require('./routes/courses.route')(app);
    require('./routes/users.route')(app);
    require('./routes/category.route')(app);
    require('./routes/lesson.route')(app);
    require('./routes/upload.route')(app);
};
