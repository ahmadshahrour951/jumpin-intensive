if (process.env.NODE_ENV !== 'production') require('dotenv-safe').config();
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

const db = require('./models');

const app = express();

app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(morgan('combined'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});

const PORT = process.env.PORT || 8000;

db.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log('Error: ' + err));

module.exports = app;
