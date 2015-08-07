'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div>
        App components
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;