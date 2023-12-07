const pathService = require('../services/paths.service');

module.exports = function (app) {
    app.get('/path/search',pathService.searchPath);
    app.get('/path/:pathName',pathService.getOne);
    app.get('/path',pathService.getAll);
    
    
}