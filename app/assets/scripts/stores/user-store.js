'use strict';
var Reflux = require('reflux');
var UserActions = require('../actions/user-actions');
var config = require('../config');
var $ = require('jquery');

var UserStore = module.exports = Reflux.createStore({

  storage: {
    user: {
      username: null,
      isLogged: false
    }
  },

  init: function() {
    this.listenTo(UserActions.userLogin, this.loginUser);
    this.listenTo(UserActions.userLogout, this.logoutUser);
    this.checkLogin();
  },

  checkLogin: function() {
    var _self = this;
    $.ajax({
      type: "GET",
      url: config.OAMUploaderApi + '/login',
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function(res) {
      _self.storage.user.username = res.data.username;
      _self.storage.user.isLogged = true;
      _self.trigger();
    });
  },

  loginUser: function(username, password) {
    var _self = this;

    // http://stackoverflow.com/questions/2870371/why-is-jquerys-ajax-method-not-sending-my-session-cookie
    $.ajax({
      type: "POST",
      url: config.OAMUploaderApi + '/login',
      xhrFields: {
        withCredentials: true
      },
      data: {
        username: username,
        password: password
      }
    })
    .done(function(res) {
      _self.storage.user.username = username;
      _self.storage.user.isLogged = true;
      UserActions.userLogin.completed();
    })
    .fail(function(jqXHR) {
      var response = jqXHR.responseJSON;
      UserActions.userLogin.failed(response.message);
    });
  },

  logoutUser: function() {
    var _self = this;
    $.ajax({
      type: "GET",
      url: config.OAMUploaderApi + '/logout',
      xhrFields: {
        withCredentials: true
      }
    })
    .done(function(res) {
      _self.storage.user.username = null;
      _self.storage.user.isLogged = false;
      UserActions.userLogout.completed();
    })
    .fail(function(/*jqXHR*/) {
      UserActions.userLogout.failed();
    });
  },

  isLogged: function() {
    return this.storage.user.isLogged;
  },

  getUsername: function() {
    return this.storage.user.username;
  },

});
