var 
express      = require("express"),
bodyParser   = require("body-parser"),
cookieParser = require("cookie-parser"),
session      = require("express-session"),

config = require("./config/index"),
app = express();

//module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({ secret : config.server.sessionSecret }));

  require("./routes")(app);
//};

app.listen(config.server.port, config.server.ip);
