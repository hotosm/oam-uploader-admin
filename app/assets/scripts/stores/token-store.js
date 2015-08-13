'use strict';
var Reflux = require('reflux');
var TokenActions = require('../actions/token-actions');
var config = require('../config');
var $ = require('jquery');

var TokenStore = module.exports = Reflux.createStore({

  storage: {
    tokens: []
  },

  init: function() {
    this.listenTo(TokenActions.refreshTokenList, this.refreshTokenList);
    this.listenTo(TokenActions.deleteToken, this.deleteToken);
    this.listenTo(TokenActions.createToken, this.createToken);
    this.listenTo(TokenActions.editToken, this.editToken);
  },

  refreshTokenList: function() {
    var _self = this;
    $.ajax({
      type: "GET",
      url: config.OAMUploaderApi + '/tokens',
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function(res) {
      _self.storage.tokens = res.data;
      _self.trigger();
    })
    .fail(function(jqXHR) {
      var response = jqXHR.responseJSON;
      TokenActions.refreshTokenList.failed(response.message);
    });
  },

  deleteToken: function(id) {
    var _self = this;
    $.ajax({
      type: "DELETE",
      url: config.OAMUploaderApi + '/tokens/' + id,
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function(res) {
      // Delete was successful. Remove form list without new query.
      var tl = _self.storage.tokens.length;
      for (var i = 0; i < tl; i++) {
        if (_self.storage.tokens[i]._id === id) {
          break;
        }
      }
      _self.storage.tokens.splice(i, 1);
      _self.trigger();
      TokenActions.deleteToken.completed();
    })
    .fail(function(jqXHR) {
      var response = jqXHR.responseJSON;
      TokenActions.deleteToken.failed(response.message);
    });
  },

  createToken: function(data) {
    var _self = this;
    $.ajax({
      type: "POST",
      url: config.OAMUploaderApi + '/tokens',
      data: data,
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function(res) {
      _self.storage.tokens.push(res.data);
      _self.trigger();
      TokenActions.createToken.completed();
    })
    .fail(function(jqXHR) {
      var response = jqXHR.responseJSON;
      TokenActions.createToken.failed(response.message);
    });
  },

  editToken: function(id, data) {
    var _self = this;
    $.ajax({
      type: "PUT",
      url: config.OAMUploaderApi + '/tokens/' + id,
      data: data,
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function(res) {
      // Update was successful. Replace on list.
      var tl = _self.storage.tokens.length;
      for (var i = 0; i < tl; i++) {
        if (_self.storage.tokens[i]._id === id) {
          break;
        }
      }
      _self.storage.tokens.splice(i, 1, res.data);
      _self.trigger();
      TokenActions.editToken.completed();
    })
    .fail(function(jqXHR) {
      var response = jqXHR.responseJSON;
      TokenActions.editToken.failed(response.message);
    });
  },

  getTokens: function() {
    return this.storage.tokens;
  },

});
