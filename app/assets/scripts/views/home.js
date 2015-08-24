'use strict';
var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var UserStore = require('../stores/user-store');
var TokenStore = require('../stores/token-store');
var AppActions = require('../actions/app-actions');
var TokenActions = require('../actions/token-actions');
var TokenFormModal = require('../components/modals/token-form-modal');

var Home = React.createClass({
  mixins: [
    Reflux.listenTo(TokenStore, 'onTokenStore'),
    Reflux.listenTo(TokenActions.deleteToken.completed, 'onTokenDeleteSuccess'),
    Reflux.listenTo(TokenActions.deleteToken.failed, 'onTokenDeleteFail'),
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      tokens: [],
      formModal: {
        action: null,
        data: null
      }
    };
  },

  componentDidMount: function() {
    if (UserStore.isLogged()) {
      TokenActions.refreshTokenList();
    }
    else {
      this.transitionTo('login');
    }
  },

  onTokenStore: function() {
    this.setState({
      tokens: TokenStore.getTokens()
    });
  },

  onTokenDeleteSuccess: function() {
  },

  onTokenDeleteFail: function() {
  },

  deleteToken: function(tokenId, event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete the token?')) {
      TokenActions.deleteToken(tokenId);
    }
  },

  openCreateModal: function() {
    this.setState({
      formModal: {
        action: 'create',
        data: null
      }
    });
  },

  openEditModal: function(data) {
    this.setState({
      formModal: {
        action: 'edit',
        data: data
      }
    });
  },

  formModalDismiss: function() {
    this.setState({
      formModal: {
        action: null,
        data: null
      }
    });
  },


  renderTokens: function() {
    if (this.state.tokens.length === 0) {
      return (
        <div className="panel-blank-message">
          <p>There are currently no tokens to manage. Start by adding one using the <em>Create</em> button located above.</p>
        </div>
      );
    }
    else {
      return (
        <div className="panel-tabular-data">
          <table className="table tokens-table">
            <thead className="tokens-table-header">
              <tr>
                <th className="th-status"><a href="#" title="Sort by status" className="sort sort-none">Status</a></th>
                <th className="th-description">Key</th>
                <th className="th-edit-date"><a href="" title="Sort by edit date" className="sort sort-desc">Last update</a></th>
                <th className="th-expiration-date"><a href="" title="Sort by expiration date" className="sort sort-none">Expiration</a></th>
                <th className="th-actions"><span>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {this.state.tokens.map(this.renderTokenRow)}
            </tbody>
          </table>
        </div>
      );
    }
  },

  renderTokenRow: function(data, index) {
    var statusClasses = 'status status-' + data.status;
    return (
      <tr key={index}>
        <td className="cell-status"><em className={statusClasses}>{data.status}</em></td>
        <td className="cell-description">
          <strong>{data.token}</strong>
          <p>{data.name}</p>
        </td>
        <td className="cell-edit-date">{data.updated || data.created}</td>
        <td className="cell-expiration-date">{data.expiration}</td>
        <td className="cell-actions">
          <ul className="table-actions-list" role="toolbar">
            <li><button type="button" title="Delete token" className="bttn-delete" onClick={this.deleteToken.bind(null, data._id)}><span>Delete</span></button></li>
            <li><button type="button" title="Edit token" className="bttn-edit" onClick={this.openEditModal.bind(null, data)}><span>Edit</span></button></li>
          </ul>
        </td>
      </tr>
    );
  },

  renderFormModal: function() {
    if (this.state.formModal.action === null) {
      return null;
    }

    var data =  this.state.formModal.action === 'edit' ? 
      this.state.formModal.data : 
      { token: '', name: '', expiration: '', status: 'active' };

    return (<TokenFormModal onCloseClick={this.formModalDismiss} revealed={true} action={this.state.formModal.action} data={data} />);
  },

  render: function() {
    if (!UserStore.isLogged()) {
      return null;
    }

    return (
      <section className="panel manager-panel">
        <header className="panel-header">
          <div className="panel-headline">
            <h1 className="panel-title">Tokens</h1>
            <p className="panel-subtitle"># entries</p>
          </div>
          <div className="panel-tools">
            <ul className="panel-tools-list" role="toolbar">
              <li>
                <button type="button" className="bttn-add" title="Create token" onClick={this.openCreateModal}><span>Create</span></button>
              </li>
            </ul>
          </div>
        </header>
        <div className="panel-body">
          {this.renderTokens()}
        </div>
        <footer className="panel-footer">
        </footer>

        {this.renderFormModal()}
      </section>
    );
  }
});

module.exports = Home;