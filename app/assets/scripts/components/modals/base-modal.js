'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Reflux = require('reflux');
var Keys = require('react-keybinding');
var actions = require('../../actions/app-actions');

/**
 * The base modal contains the wrapper code for the modals and should not be
 * instantiated directly.
 *
 * Create a new class instead that and pass the props to the modal.
 * The values for header, body, and footer should be returned by a function.
 * Type must match the value passed to actions.openModal(which).
 * <BModal
 *  type="info"
 *  header={this.getHeader()}
 *  body={this.getBody()}
 *  footer={this.getFooter()} />
 */
var BModal = React.createClass({
  mixins: [
    Reflux.listenTo(actions.openModal, 'onOpenModal'),
    Keys
  ],

  keybindings: {
    'esc': function() {
      if (this.props.onCloseClick !== false) {
        this.props.onCloseClick.call(this);
      }
    }
  },

  onOpenModal: function(which) {
    if (which == this.props.type) {
      this.setState({ revealed: true });
    }
  },

  getInitialState: function() {
    return {
      revealed: this.props.revealed
    };
  },

  getDefaultProps: function() {
    return {
      header: null,
      body: null,
      footer: null,

      revealed: false,
      animation: true,

      onOverlayClick: function(e) {
        // Prevent children from triggering this.
        if(e.target === e.currentTarget) {
          this.setState({ revealed: false });
        }
      },

      onCloseClick: function(e) {
        this.setState({ revealed: false });
      },
    }
  },

  onOverlayClick: function(e) {
    if (this.props.onOverlayClick !== false) {
      this.props.onOverlayClick.call(this, e);
    }
  },

  onCloseClick: function(e) {
    e.preventDefault();
    if (this.props.onCloseClick !== false) {
      this.props.onCloseClick.call(this, e);
    }
  },

  render: function () {
    var modal = null;
    var header = null;
    var footer = null;

    if (this.props.header !== false) {
      header = (
        <header className="modal-header">
          {this.props.header}
        </header>
      );
    }

    if (this.props.footer !== false) {
      footer = (
        <footer className="modal-footer">
          {this.props.footer}
        </footer>
      );
    }

    if (this.state.revealed) {
      modal = (
        <section className="modal" key={"modal-" + this.props.type} onClick={this.onOverlayClick} id={"modal-" + this.props.type}>
          <div className="modal-inner">
            <span className="dismiss-modal">
              <a className="close" title="Close" onClick={this.onCloseClick}><span>Close</span></a>
            </span>
            {header}
            <div className="modal-body">
              {this.props.body}
            </div>
            {footer}
          </div>
        </section>
      );
    }

    if (this.props.animation) {
      return (
        <ReactCSSTransitionGroup component="div" transitionName="modal">
          {modal}
        </ReactCSSTransitionGroup>
      );
    }
    else {
      return modal;
    }

  }
});

module.exports = BModal;