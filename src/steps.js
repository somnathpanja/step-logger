(function () {
  'use strict';

  var List = require('jscollection').List;
  var util = require('util');

  var Step = function (globalId) {
    this._globalId = globalId;
    this._flowName = "FlowName";
    this._steps = new List();
    this._info = {};
    this.isEnabled = false;
  };

  Step.prototype.start = function (nameOfTheFlow) {
    if (!this.isEnabled) return;
    this._flowName = nameOfTheFlow;
  };

  Step.prototype.end = function (endMessage) {
    if (!this.isEnabled) return;
    this.log(endMessage || 'End of ' + this._flowName);
    this.printReport();
  };

  /**
   * 1) key can be string and value can be anything
   * 2) Key can be an object and value can be the array of key names to pick or select from object
   * @param key
   * @param value
   */
  Step.prototype.setInfo = function (key, value) {
    if (typeof key === "string")
      this._info[key] = value;
    else if (typeof key === "object") {
      var keys = Array.isArray(value) ? value : Object.keys(key);

      for (var idx = 0; idx < keys.length; idx++) {
        this._info[keys[idx]] = key[keys[idx]];
      }
    }
  };

  Step.prototype.log = function (msg, extraInfo, printImmediateInConsole) {
    if (!this.isEnabled) return;
    var currentIndex = this._steps.length;
    var log = this._flowName + ' - ' + currentIndex + ')' + msg + "|" + util.inspect(extraInfo);
    this._steps.addRange(log);
    if (printImmediateInConsole) console.log(log);
  };

  Step.prototype.printReport = function () {
    this._steps.each(function (logMsg) {
      console.log(logMsg);
    });
  };

  Step.prototype.delete = function () {
    this._steps = null;
    delete this._info;
    var gId = this._globalId;
    process.nextTick(function () {
      delete SL[gId];
    });
  };

  module.exports = Step;
})();