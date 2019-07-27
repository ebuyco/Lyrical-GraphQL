const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/*eslint-disable*/
const models = require('./models');
const schema = require('./schema/schema');
/*eslint-disable*/
// const path = require('path');

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../client/webpack/webpack.config');

const app = express()
// ,DIST_DIR = __dirname,
// HTML_FILE = path.join(DIST_DIR, 'index.html'),
// compiler = webpack(webpackConfig)

// app.use(webpackMiddleware(compiler, {
//   publicPath: webpackConfig.output.publicPath
// }))
// app.get('*', (req, res, next) => {
//   compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
//   if (err) {
//     return next(err)
//   }
//   res.set('content-type', 'text/html')
//   res.send(result)
//   res.end()
//   })
// })

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://ebuyco:ebuyco2019@ds133137.mlab.com:33137/lyricaldb';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));



app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
