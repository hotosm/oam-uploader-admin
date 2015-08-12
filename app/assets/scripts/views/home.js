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

            <section className="panel manager-panel">
              <header className="panel-header">
                <div className="panel-headline">
                  <h1 className="panel-title">Tokens</h1>
                  <p className="panel-subtitle">4 entries</p>
                </div>
                <div className="panel-tools">
                  <ul className="panel-tools-list" role="toolbar">
                    <li>
                      <button type="button" className="bttn-add" title="Create token"><span>Create</span></button>
                    </li>
                  </ul>
                </div>
              </header>
              <div className="panel-body">
                { /*
                <div className="panel-blank-message">
                  <p>There are currently no tokens to manage. Start by adding one using the <em>Create</em> button located above.</p>
                </div>
                */ }

                <div className="panel-tabular-data">
                  <table className="table tokens-table">
                    <thead className="tokens-table-header">
                      <tr>
                        <th className="th-status"><a href="#" title="Sort by status" className="sort">Status</a></th>
                        <th className="th-description">Key</th>
                        <th className="th-edit-date"><a href="" title="Sort by edit date" className="sort">Last update</a></th>
                        <th className="th-expiration-date"><a href="" title="Sort by expiration date" className="sort">Expiration</a></th>
                        <th className="th-actions"><span>Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="cell-status"><em className="status status-active">Active</em></td>
                        <td className="cell-description">
                          <strong>120a81d1a235c3512fb85ab4fe67acb4e9cb8b0590789cc034d0da140a4a8ea8</strong>
                          <p>Token description lorem ipsum dolor sit amet.</p>
                        </td>
                        <td className="cell-edit-date">12 Aug, 2015</td>
                        <td className="cell-expiration-date">18 Sep, 2015</td>
                        <td className="cell-actions">
                          <ul className="table-actions-list" role="toolbar">
                            <li><button type="button" title="Delete token" className="bttn-delete"><span>Delete</span></button></li>
                            <li><button type="button" title="Edit token" className="bttn-edit"><span>Edit</span></button></li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td className="cell-status"><em className="status status-blocked">Blocked</em></td>
                        <td className="cell-description">
                          <strong>120a81d1a235c3512fb85ab4fe67acb4e9cb8b0590789cc034d0da140a4a8ea8</strong>
                          <p>Token description lorem ipsum dolor sit amet.</p>
                        </td>
                        <td className="cell-edit-date">12 Aug, 2015</td>
                        <td className="cell-expiration-date">18 Sep, 2015</td>
                        <td className="cell-actions">
                          <ul className="table-actions-list" role="toolbar">
                            <li><button type="button" title="Delete token" className="bttn-delete"><span>Delete</span></button></li>
                            <li><button type="button" title="Edit token" className="bttn-edit"><span>Edit</span></button></li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
              <footer className="panel-footer">
              </footer>
            </section>

          </div>
        </main>
      </div>
    );
  }
});

module.exports = Home;