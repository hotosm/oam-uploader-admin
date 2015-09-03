'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var UserActions = require('../actions/user-actions');
var AppActions = require('../actions/app-actions');
var UserStore = require('../stores/user-store');

var Login = React.createClass({
  mixins: [
    Reflux.listenTo(UserActions.userLogin.completed, 'onLoginSuccess'),
    Reflux.listenTo(UserActions.userLogin.failed, 'onLoginFail'),
    Router.Navigation,
    Router.State
  ],

  componentDidMount: function() {
    if (UserStore.isLogged()) {
      return this.transitionTo('home');
    }
    // Add page class to body.
    document.body.className = document.body.className.replace(/ ?page-signin/, '') + ' page-signin';
  },

  componentWillUnmount: function() {
    // Remove page class from body.
    document.body.className = document.body.className.replace(/ ?page-signin/, '');
  },

  login: function(e) {
    e.preventDefault();
    var username = React.findDOMNode(this.refs['signin-username']);
    var password = React.findDOMNode(this.refs['signin-password']);
    UserActions.userLogin(username.value, password.value);
  },

  onLoginSuccess: function() {
    // Login successful.
    AppActions.showNotification('success', 'Welcome back!');
    AppActions.clearNotification(4000);
    this.transitionTo('home');
  },

  onLoginFail: function(message) {
    AppActions.showNotification('alert', message);

    var node = React.findDOMNode(this);
    // Remove error class.
    node.className = node.className.replace(/ ?form-says-no/, '');
    // Add it back on next tick.
    setTimeout(function() { node.className += ' form-says-no'; }, 10);
  },

  render: function() {
    return (
      <section className="panel signin-panel">
        <header className="panel-header">
          <div className="panel-headline">
            <h1 className="panel-title">Sign in</h1>
          </div>
        </header>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="signin-username">Username</label>
              <div className="form-control-set">
                <input type="text" className="form-control" placeholder="Username" name="signin-username" ref="signin-username" id="signin-username" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signin-password">Password</label>
              <div className="form-control-set">
                <input type="password" className="form-control" placeholder="Password" name="signin-password" ref="signin-password" id="signin-password" />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="bttn-submit" onClick={this.login}><span>Sign in</span></button>
            </div>

          </form>
        </div>
      </section>
    );
  }
});

module.exports = Login;