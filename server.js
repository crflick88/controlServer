var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    cors            = require('cors'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser');

var app = express();

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

var router = express.Router();  
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Middleware working.. Something is happening.');
    alert("middleware");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    
    next(); // make sure we go to the next routes and don't stop here
});


app.use(require('./anonymous-routes'));
app.use(require('./protected-routes'));
app.use(require('./user-routes'));

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

