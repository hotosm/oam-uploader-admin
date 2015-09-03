'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var BModal = require('./base-modal');
var TokenActions = require('../../actions/token-actions');
var AppActions = require('../../actions/app-actions');
var DateTimePicker = require('react-widgets').DateTimePicker;
var ValidationMixin = require('react-validation-mixin');
var Joi = require('joi');

var TokenFormModal = React.createClass({
  displayName: 'TokenFormModal',

  mixins: [
    ValidationMixin,
    Reflux.listenTo(TokenActions.editToken.completed, 'onTokenEditSuccess'),
    Reflux.listenTo(TokenActions.editToken.failed, 'onTokenEditFail'),
    Reflux.listenTo(TokenActions.createToken.completed, 'onTokenCreateSuccess'),
    Reflux.listenTo(TokenActions.createToken.failed, 'onTokenCreateFail')
  ],

  validatorTypes:  {
    'token' : Joi.object().keys({
      'name': Joi.string().required(),
      'expiration': Joi.alternatives().try(Joi.date().min('now'), Joi.boolean()).invalid(true).required(),
      'status': Joi.any().valid('active', 'blocked').required()
    })
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

  //
  // Modal methods
  // 
  getHeader: function() {
    return (
      <h1 className="modal-title">
        {this.props.action === 'create' ? 'Create token' : 'Edit token'}
      </h1>
    );
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
              <input type="text" className="form-control" placeholder="Short description" name="name" value={this.state.token.name} onChange={this.onValueChange} onBlur={this.handleValidation('token.name')} maxLength="128" />
              {this.renderErrorMessage(this.getValidationMessages('token.name')[0])}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label none">Expiration</label>
            <div className="form-control-set">

              <DateTimePicker ref="expiration"
                format="yyyy-MM-dd HH:mm:ss"
                timeFormat="HH:mm"
                placeholder="(optional)"
                value={this.getValueForDate('expiration')}
                onChange={this.onDateChange.bind(null, 'expiration')} />

                {this.renderErrorMessage(this.getValidationMessages('token.expiration')[0])}

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
        {this.state.loading ? <p className="loading revealed">Loading</p> : null}
      </div>
    );
  },

  getFooter: function() {
    return false;
  },

  render: function () {
    // Notes on animation={false}.
    // 
    // Normally the modal wrapper is always injected in the DOM and the
    // animation is handled by the Base modal.
    // Since it is already in the DOM is just a matter of having enter and
    // leave animations.
    // In this case the modal is being managed by another view and its
    // wrapper isn't always rendered.
    // To solve the problem the animation is handled directly in the parent.
    // 
    // Why isn't the modal always present?
    // Because the modal has a lot of interactivity (form) and is easier to
    // handle this way.
    // 
    return (
      <BModal
        type="token-editing"
        onOverlayClick={false}
        onCloseClick={this.props.onCloseClick}
        revealed={this.props.revealed}
        header={this.getHeader()}
        body={this.getBody()}
        footer={this.getFooter()}
        animation={false} />
    );
  },

  renderErrorMessage: function(message) {
    message = message || '';
    if (message.trim().length === 0) { return null }

    return (
      <p className="message message-alert">{message}</p>
    );
  },

  //
  // Value related methods
  //

  getValueForDate: function(field) {
    return this.state.token[field] === null || this.state.token[field] === false ? null : new Date(this.state.token[field]);
  },

  onValueChange: function(event) {
    var data = this.state.token;
    data[event.target.name] = event.target.value;
    this.setState(data);
  },

  onDateChange: function(field, date, dateString) {
    var val = date === null ? false : date.toISOString();
    var data = this.state.token;
    data[field] = val;
    this.setState(data);
  },

  onSubmit: function(event) {
    event.preventDefault();

    // Warning... Controlled HACK.
    // The state should never be changed in this way as it doesn't trigger
    // a render, however it will be updated by the validate function later on.
    // This is needed to clear previous errors as the plugin doesn't handle
    // arrays of objects specially well.
    this.state.errors = {};

    this.validate(function(error, validationErrors) {
      if (error) {
        console.log(validationErrors);
      } else {

        if (this.state.loading) {
          // Submit already in process.
          return;
        }
        this.setState({loading: true});

        if (this.props.data._id) {
          console.log('TokenFormModal editing');
          TokenActions.editToken(this.props.data._id, this.state.token);
        }
        else {
          console.log('TokenFormModal creating');
          TokenActions.createToken(this.state.token);
        }
      }
    }.bind(this));

  },

  //
  // Action callbacks
  //

  onTokenEditSuccess: function() {
    AppActions.showNotification('success', 'Token successfully updated!');
    AppActions.clearNotificationAfter(4000);

    this.setState({loading: false});
    this.props.onCloseClick();
  },

  onTokenEditFail: function(message) {
    AppActions.showNotification('alert', message);
    this.setState({loading: false});
  },

  onTokenCreateSuccess: function() {
    AppActions.showNotification('success', 'Token successfully created!');
    AppActions.clearNotificationAfter(4000);

    this.setState({loading: false});
    this.props.onCloseClick();
  },

  onTokenCreateFail: function(message) {
    AppActions.showNotification('alert', message);
    this.setState({loading: false});
  }

});

module.exports = TokenFormModal;