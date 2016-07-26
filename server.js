var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser'),
    config          = require('./config');
    //config          = require('./localConfig');

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
  app.use(errorhandler());
}
// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
mongoose.connect(config.database);


app.use(require('./routes/anonymous-routes'));
app.use(require('./routes/protected-routes'));
app.use(require('./routes/user-routes'));

app.use(require('./routes/proveedor-routes'));
app.use(require('./routes/cliente-routes'));
app.use(require('./routes/factura-routes'));
app.use(require('./routes/sucursal-routes'));
app.use(require('./routes/producto-routes'));

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  if(err)
    console.log('error launching http://localhost:' + port);
  else  
    console.log('listening in http://localhost:' + port);
});



