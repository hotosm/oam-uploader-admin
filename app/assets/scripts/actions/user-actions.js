'use strict';
var Reflux = require('reflux');

var UserActions = module.exports = Reflux.createActions({
  'userLogin': { asyncResult: true },
  'userLogout': { asyncResult: true }
});
