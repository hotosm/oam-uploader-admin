'use strict';
var React = require('react/addons');

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <header className="site-header" role="banner">
          <div className="inner">
            <div className="site-headline">
              <h1 className="site-title"><img src="assets/graphics/layout/oam-logo-h-pos.svg" width="167" height="32" alt="OpenAerialMap logo" /><span>OpenAerialMap</span> <small>Token Manager</small></h1>
            </div>
          </div>
        </header>
        <main className="site-body" role="main">
          <div className="inner">

            <div className="prose">
              <p>Hello world!</p>
            </div>

          </div>
        </main>
      </div>
    );
  }
});

module.exports = Home;