module.exports = function (app) {
    require('./routes/courses.route')(app);
    require('./routes/users.route')(app);
    require('./routes/paths.route')(app);
};
