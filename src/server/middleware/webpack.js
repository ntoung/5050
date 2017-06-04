'use strict';

const path = require('path');
const _ENV = require('../config.js').ENV;

const _BUILD_DIR = path.join(__dirname, '../..', 'dist');

module.exports = (app, express) => {
  if (_ENV === 'production') {
    // Production environment
    app.use(express.static(_BUILD_DIR));
    app.get('*', (req, res) => {
      res.sendFile(path.join(_BUILD_DIR, 'index.html'));
    });
  } else {
    // Development environment
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    const webpack = require('webpack');
    const config = require('../../../webpack.config.js');
    
    const compiler = webpack(config);
    

    // https://github.com/webpack/webpack-dev-middleware
    app.use(webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));

    // https://github.com/glenjamin/webpack-hot-middleware
    app.use(webpackHotMiddleware(compiler));

    app.get('*', (req, res) => {
      res.write(webpackDevMiddleware.fileSystem.readFileSync(path.join(_BUILD_DIR, 'index.html')));
      res.end();
    });
  }
};