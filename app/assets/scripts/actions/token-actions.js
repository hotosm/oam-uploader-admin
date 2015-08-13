'use strict';
var Reflux = require('reflux');

var TokenActions = module.exports = Reflux.createActions({
  'refreshTokenList': { asyncResult: true },
  'deleteToken': { asyncResult: true },

  'createToken': { asyncResult: true },
  'editToken': { asyncResult: true },
});
