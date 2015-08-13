'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppActions = require('../actions/app-actions');
var Notifications = require('../components/notifications')
var UserStore = require('../stores/user-store');

var UserActions = require('../actions/user-actions');

var App = React.createClass({
  mixins: [
    Reflux.listenTo(AppActions.showNotification, 'onNotificationShow'),
    Reflux.listenTo(AppActions.clearNotification, 'dismissNotification'),

    Reflux.listenTo(UserActions.userLogout.completed, 'onLogoutSuccess'),
    Router.Navigation,
    Router.State
  ],

  getInitialState: function() {
    return {
      notification: { type: null, message: null }
    };
  },

  onNotificationShow: function(type, message) {
    this.setState({
      notification: { type: type,  message: message }
    });
  },

  dismissNotification: function() {
    this.setState({
      notification: { type: null, message: null }
    });
  },

  logout: function(e) {
    e.preventDefault();
    UserActions.userLogout();
  },

  onLogoutSuccess: function() {
    this.transitionTo('login');
    AppActions.showNotification('success', 'Sad to see you go!');
    setTimeout(function() {
      AppActions.clearNotification();
    }, 2000)
  },

  renderUserInfo: function() {
    if (!UserStore.isLogged()) {
      return null;
    }

    return (
      <nav className="site-prime-nav">
        <h2><small>Signed in as</small> {UserStore.getUsername()}</h2>
        <ul className="meta-menu">
          <li><a href="#" className="bttn-signout" title="Sign out" onClick={this.logout}><span>Sign out</span></a></li>
        </ul>
      </nav>
    );
  },

  render: function() {
    return (
      <div>
        <div className="inner-wrapper">
          <header className="site-header" role="banner">
            <div className="inner">
              <div className="site-headline">
                <h1 className="site-title"><img src="assets/graphics/layout/oam-logo-h-pos.svg" width="167" height="32" alt="OpenAerialMap logo" /><span>OpenAerialMap</span> <small>Token Manager</small></h1>
              </div>
              {this.renderUserInfo()}
            </div>
          </header>
          <main className="site-body" role="main">
            <div className="inner">
              <RouteHandler/>
            </div>
          </main>
        </div>
        <Notifications type={this.state.notification.type} onNotificationDismiss={this.dismissNotification}>{this.state.notification.message}</Notifications>
      </div>
    );
  }
});

module.exports = App;