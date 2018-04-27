const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const layout = require('./views/layout');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(layout(''));
});

app.listen(8080, 'localhost', () => {
  console.log('The server is listening on port 8080');
});
