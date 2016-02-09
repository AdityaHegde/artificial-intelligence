var
express = require("express");

module.exports = function(app, passport) {

  app.use("/", express.static('./dist'));

};
