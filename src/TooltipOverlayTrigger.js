var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var uid = require('uid');



/**
 *	A specialized OverlayTrigger that adds an accessibility
 *	layer to the standard tooltips.
 */
module.exports = React.createClass({

	/**
	 *	Returns the tooltip id, or generate a unique
	 *	one if none was set.
	 *
	 *	@return int id.
	 */
	tooltipId: function() {
		return this.props.overlay.props.id
			? this.props.overlay.props.id
			: 'tooltip-' + uid();
	},

	/**
	 *	Closes the tooltip when the user presses esc.
	 *
	 *	@param object event Event.
	 */
	handleKeyDown: function(event) {
		if (event.keyCode === 27) {
			this.refs.trigger.handleDelayedHide();
		}

		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}
	},

	/**
	 *	Renders the overlay and the tooltip with all the
	 *	required attributes and handlers.
	 */
	render: function() {
		var id = this.tooltipId();
		var child = this.renderChild(id);
		var tooltip = this.renderTooltip(id);

		return (
			<ReactBootstrap.OverlayTrigger ref="trigger" {...this.props} overlay={tooltip}>
				{child}
			</ReactBootstrap.OverlayTrigger>
		);
	},

	/**
	 *	Renders the enriched tooltip.
	 */
	renderTooltip: function(id) {
		return React.cloneElement(this.props.overlay, {
			id: id,
			role: 'tooltip'
		});
	},

	/**
	 *	Renders the enriched child.
	 */
	renderChild: function(tooltipId) {
		var child = React.Children.only(this.props.children);

		return React.cloneElement(child, {
			'aria-describedby': tooltipId,
			'onKeyDown': this.handleKeyDown
		});
	}
});
