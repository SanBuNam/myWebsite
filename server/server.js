const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'HI' });
});

app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(3050, () => console.log('listening to 3050'));