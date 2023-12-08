const Express = require('express');
const dotenv = require('dotenv').config();
const BodyParser = require('body-parser');
const MethodOverride = require('method-override');
const cors = require('cors');
const dbConnect = require('./app/configs/dbConnect');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const App = Express();
dbConnect();
App.use(morgan("dev"));

App.use(BodyParser.json({}));
App.use(cookieParser())


App.use(MethodOverride('X-HTTP-Method-Override'));

App.use(cors());

require('./app/route')(App);


const server = require('http').createServer(App);

server.listen(3000, function () {
    console.log('Server is listening on port %d', 3000);
});

// expose app
module.exports = App;
 
                                                                                                                                         