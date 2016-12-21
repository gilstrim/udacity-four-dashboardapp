/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import("vendor/css/jquery-jvectormap-2.0.3.css");
  app.import("vendor/css/materialize.css");
  app.import("vendor/css/style.css");
  
  app.import("vendor/js/jquery-2.1.1.min.js");
  app.import("vendor/js/jquery-jvectormap-2.0.3.min.js");
  app.import("vendor/js/jquery-jvectormap-europe-mill.js");
  app.import("vendor/js/jquery.tablesorter.min.js");
  app.import("vendor/js/moment.min.js");
  app.import("vendor/js/chart.min.js");  
  app.import("vendor/js/materialize.js");

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
