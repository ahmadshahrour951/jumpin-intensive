if (process.env.NODE_ENV !== 'production') require('dotenv-safe').config();
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

const db = require('./models');
const routes = require('./routes');

/////////////////////////////////////////////////////////////////////////////////////////
// Create root App object
/////////////////////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 8000;

const app = express();

/////////////////////////////////////////////////////////////////////////////////////////
// Register third party middleware
/////////////////////////////////////////////////////////////////////////////////////////
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./helpers/hbs.helper')
  })
);
app.set('view engine', 'hbs');
app.use(
  '/bootstrap',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist'))
);
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'bootstrap'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
    outputStyle: 'compressed',
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan('combined'));

/////////////////////////////////////////////////////////////////////////////////////////
// Register all routes
/////////////////////////////////////////////////////////////////////////////////////////
app.use('/', routes);

/////////////////////////////////////////////////////////////////////////////////////////
// Start Database & Server
/////////////////////////////////////////////////////////////////////////////////////////
db.sequelize
  .sync({ force: !(process.env.NODE_ENV === 'production') })
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log('Error: ' + err));

module.exports = app;
