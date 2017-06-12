var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var uid = require('uid');
var OverlayTrigger = ReactBootstrap.OverlayTrigger;



/**
 *	A specialized OverlayTrigger that adds an accessibility
 *	layer to the standard tooltips.
 */
module.exports = React.createClass({

	/**
	 *	Closes the tooltip when the user presses esc.
	 *
	 *	@param object event Event.
	 */
	handleKeyDown: function(event) {
		if (event.keyCode === 27) {
			this.trigger.handleDelayedHide();
		}

		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}
	},

	/**
	 *
	 */
	referenceTrigger(trigger) {
		this.trigger = trigger;
	},

	/**
	 *	Renders the overlay and the tooltip with all the
	 *	required attributes and handlers.
	 */
	render: function() {
		return (
			<OverlayTrigger {...this.props} ref={this.referenceTrigger}>
				{this.renderChild()}
			</OverlayTrigger>
		);
	},

	/**
	 *	Renders the enriched child.
	 */
	renderChild: function() {
		var child = React.Children.only(this.props.children);

		return React.cloneElement(child, {
			'onKeyDown': this.handleKeyDown
		});
	}
});
