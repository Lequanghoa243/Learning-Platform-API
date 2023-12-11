const userService = require('../services/users.service');
const authMiddleware = require('../middleware/authmiddleware')
module.exports = function (app) {
    app.get('/user/course-list',authMiddleware,userService.getCourseList);
    app.post('/user/forgot-password-token',userService.forgotPasswordToken);
    app.get('/user/refresh',userService.handleRefreshToken);
    app.put('/user/password',authMiddleware,userService.updatePassword);
    app.post('/user/login',userService.login);
    app.post('/user/register',userService.register);
    app.get('/user/logout',userService.logout);
    app.put('/user/edit-profile',authMiddleware,userService.updateUser);
    app.post('/user/reset-password/:token',userService.resetPassword);
    app.delete('/user/delete',authMiddleware,userService.deleteaUser);
    app.get('/user/profile',authMiddleware,userService.getaUser);

}