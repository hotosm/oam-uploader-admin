'use strict';
var React = require('react/addons');

var Login = React.createClass({
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
              <label className="form-label" for="signin-username">Username</label>
              <div className="form-control-set">
                <input type="text" className="form-control" placeholder="Username" name="signin-username" id="signin-username" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" for="signin-password">Password</label>
              <div className="form-control-set">
                <input type="password" className="form-control" placeholder="Password" name="signin-password" id="signin-password" />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="bttn-submit"><span>Sign in</span></button>
            </div>

          </form>
        </div>
      </section>
    );
  }
});

module.exports = Login;