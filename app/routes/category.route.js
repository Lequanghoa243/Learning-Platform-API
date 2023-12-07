const categoryervice = require('../services/category.service');

module.exports = function (app) {
    app.get('/category',categoryervice.getAll);
}