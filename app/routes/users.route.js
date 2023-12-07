const userService = require('../services/users.service');
const authMiddleware = require('../middleware/authmiddleware')
module.exports = function (app) {
    app.get('/user/refresh',userService.handleRefreshToken);
    app.post('/user/login',userService.login);
    app.post('/user/register',userService.register);
    app.get('/user/logout',userService.logout);
    app.put('/user/edit-user',authMiddleware,userService.updateUser);
    app.delete('/user/:id',userService.deleteaUser);
    app.get('/user/:id',authMiddleware,userService.getaUser);
}