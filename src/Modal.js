var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var FocusTrap = require('./FocusTrap');



/**
 *	A wrapper that adds an accessibility layer to the
 *	standard Modal.
 *	This is done in a completely "non-React" way, as it
 *	would require a rewrite of the components, making the
 *	changes harder to follow.
 */
module.exports = React.createClass({

	/**
	 *	Attaches event handlers and sets up the markup.
	 */
	componentDidMount: function() {
		var node = React.findDOMNode(this);
		var dialog = node.getElementsByClassName('modal-dialog')[0];
		var title = dialog.getElementsByClassName('modal-title')[0];

		dialog.setAttribute('aria-labelledby', 'modal-title');
		title.setAttribute('id', 'modal-title');
	},

	/**
	 *	Renders the modal.
	 */
	render: function() {
		return (
			<FocusTrap>
				<ReactBootstrap.Modal {...this.props} backdrop="static">
					{this.props.children}
				</ReactBootstrap.Modal>
			</FocusTrap>
		);
	}
});
