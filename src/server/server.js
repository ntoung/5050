'use strict';
const config = require('./config.js');
const express = require('express');
const app = express();

// Middleware
require('./middleware/logging.js')(app);
require('./middleware/webpack.js')(app, express);



app.listen(config.PORT, () => {
  console.log('Listening on port', config.PORT);
});




