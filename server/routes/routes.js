'use strict'
const jsonParser = require('body-parser').json();
const userController = require('../controllers/userController.js');
// var path = require ('path');
// app.use(express.static(path.join(__dirname + '.../public')));

module.exports = (app, express) => {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/yourViewDirectory');
  app.use(jsonParser);
  app.use('/', express.static(__dirname + '../client/'));
  app.get('/', (req, res) => {
     res.render('index');
  });
  app.post('/signup', jsonParser, userController.signup);
  app.post('/signin', jsonParser, userController.signin);
}
