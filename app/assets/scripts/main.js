'use strict';
var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

var App = require('./views/app');
var Home = require('./views/home');
var Login = require('./views/login');

var UhOh = require('./views/uhoh');

var routes = (
  <Route handler={App}>
    <Route name="home" path="/" handler={ Home } />
    <Route name="login" path="/login" handler={ Login } />
    <Route name="404" path="/404" handler={ UhOh } />
    {/* Redirects */}
    <Redirect from="*" to="/404" />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('site-canvas'));
});