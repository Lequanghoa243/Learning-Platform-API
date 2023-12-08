const categoryService = require('../services/category.service');

module.exports = function (app) {
    app.post('/category/create', categoryService.createCategory);
    app.get('/category',categoryService.getAllCategory);
    app.get('/category/:id',categoryService.getOneCategory);
    
}