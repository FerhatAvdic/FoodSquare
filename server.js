var express    = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const cors = require('cors');
//const passport = require('passport');
const app = express();

const dbConnectionString = "mongodb://heroku_th3wptmn:q2pftd693asrqj56l5uuppn9mf@ds239988.mlab.com:39988/heroku_th3wptmn";
mongoose.connect(dbConnectionString)
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+ dbConnectionString);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+ err);
});

// Set port
var port = process.env.PORT || 1233;        // set the port
// CORS Middleware
app.use(cors());
// Express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport Middleware
//app.use(passport.initialize());
//app.use(passport.session());
//require('./config/passport')(passport);


const users = require('./routes/users');
app.use('/api', users);
const recipes = require('./routes/recipes');
app.use('/api/recipes', recipes);

app.use('/', express.static("./"));


app.get('/',function(request,response){
    response.sendFile(path.resolve(__dirname + '/www/index.html'));
});


app.listen(port);
console.log('RESTAPI listening on port: ' + port);