(function () {
  'use strict';

  var List = require('jscollection').List;
  var Steps = require('./steps');
  var StepLogger = {_stepKeys: new List()};
  GLOBAL.SL = StepLogger;

  SL.register = function (loggerId) {
    var steps = new Steps(loggerId);
    this[loggerId] = steps;
    return steps;
  };

  module.exports = StepLogger;
})();