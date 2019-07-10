const fs = require('fs');
const path = require('path');

const express = require('express');
const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const DashboardPlugin = require('webpack-dashboard/plugin');

const createWebpackConfig = require('../config/webpack.config');

const webpackConfig = createWebpackConfig();

const app = express();
const compiler = webpack(webpackConfig);

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


function log(msg, ...args) {
  console.log(`\nWebpack:  ${msg}`, ...args);
}

compiler.apply(new DashboardPlugin());

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler));

app.listen(port, host, (err) => {
  if (err) {
    log(err);
    return;
  }

  log('🚧  App is listening at http://%s:%s', host, port);
});


