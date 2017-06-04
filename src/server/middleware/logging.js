'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = (app) => {

  // https://github.com/expressjs/body-parser
  app.use(bodyParser.urlencoded({ extended: true })); 

  // https://github.com/expressjs/body-parser
  app.use(bodyParser.json()); 

  // https://github.com/expressjs/morgan
  app.use(morgan('dev')); 
};