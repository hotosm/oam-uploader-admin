'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var BModal = require('./base-modal');
var TokenActions = require('../../actions/token-actions');

var TokenFormModal = React.createClass({
  getHeader: function() {
    return (
      <h1 className="modal-title">
        {this.props.action === 'create' ? 'Create token' : 'Edit token'}
      </h1>
    );
  },

  getInitialState: function() {
    return {
      token: {
        name: this.props.data.name,
        expiration: this.props.data.expiration,
        status: this.props.data.status,
      }
    }
  },

  onValueChange: function(event) {
    var data = this.state.token;
    data[event.target.name] = event.target.value;
    this.setState(data);
  },

  onSubmit: function(event) {
    event.preventDefault();
    if (this.props.data._id) {
      console.log('TokenFormModal editing');
      TokenActions.editToken(this.props.data._id, this.state.token);
    }
    else {
      console.log('TokenFormModal creating');
      TokenActions.createToken(this.state.token);
    }

    this.props.onCloseClick();
  },

  getBody: function() {
    return (
      <div>
        <form className="form-horizontal form-edit">

          {this.props.action === 'create' ? null : (
            <div className="form-group">
              <label className="form-label">Key</label>
              <div className="form-control-set">
                <input type="text" className="form-control" name="token" value={this.props.data.token} readOnly />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label none">Description</label>
            <div className="form-control-set">
              <input type="text" className="form-control" placeholder="Description" name="name" value={this.state.token.name} onChange={this.onValueChange} maxLength="128" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label none">Expiration</label>
            <div className="form-control-set">
              <input type="text" className="form-control" placeholder="Description" name="expiration" value={this.state.token.expiration} onChange={this.onValueChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="form-options-set">
              <div className="radio">
                <label><input type="radio" name="status" value="active" checked={this.state.token.status === 'active'} onChange={this.onValueChange} /> Active</label>
              </div>
              <div className="radio">
                <label><input type="radio" name="status" value="blocked" checked={this.state.token.status === 'blocked'} onChange={this.onValueChange} /> Blocked</label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="bttn-cancel" onClick={this.props.onCloseClick}><span>Cancel</span></button>
            <button type="submit" className="bttn-save" onClick={this.onSubmit}><span>Save</span></button>
          </div>

        </form>
      </div>
    );
  },

  getFooter: function() {
    return false;
  },

  render: function () {
    return (
      <BModal
        type="token-editing"
        onOverlayClick={false}
        onCloseClick={this.props.onCloseClick}
        revealed={this.props.revealed}
        header={this.getHeader()}
        body={this.getBody()}
        footer={this.getFooter()} />
    );
  }
});

module.exports = TokenFormModal;