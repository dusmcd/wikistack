const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const layout = require('./views/layout');
const { Page, User } = require('./models');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', require('./routes/user'));
app.use('/wiki', require('./routes/wiki'));

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

let sync = async () => {
  await Page.sync();
  await User.sync();
      app.listen(8080, 'localhost', () => {
        console.log('The server is listening on port 8080');
      });
};

sync();
// models.db.sync({force: true})

