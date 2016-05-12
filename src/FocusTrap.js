var React = require('react');



/**
 *	Traps the focus around the component's children.
 */
module.exports = React.createClass({

	/**
	 *	Initializes the component.
	 */
	componentDidMount: function() {
		var children = React.findDOMNode(this.refs.children);

		this.focusable = this.focusableElements(children);
		this.shiftPressed = false;

		document.addEventListener('keydown', this.handleKeyEvent);
		document.addEventListener('keyup', this.handleKeyEvent);

		this.previouslyFocused = document.activeElement;
		this.focusable[0].focus();
	},

	/**
	 *	Detaches event handlers and sets the focus back
	 *	to the element that triggered the modal.
	 */
	componentWillUnmount: function() {
		document.removeEventListener('keydown', this.handleKeyEvent);
		document.removeEventListener('keyup', this.handleKeyEvent);

		if (this.previouslyFocused) {
			this.previouslyFocused.focus();
		}
	},

	/**
	 *	Returns all focusable elements inside the given one.
	 *	It is an incomplete implementation, but good enough
	 *	for a demo.
	 *
	 *	@param object element DOM element.
	 *	@return array Focusable elements.
	 */
	focusableElements: function(element) {
		return element.querySelectorAll([
			'a[href]',
			'area[href]',
			'input:not([disabled])',
			'button:not([disabled])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'iframe',
			'object',
			'embed',
			'*[tabindex]:not([tabindex="-1"])',
			'*[contenteditable]'
		].join(', '));
	},

	/**
	 *	Stores if the shift key is currently pressed.
	 *
	 *	@param object event Keyboard event.
	 */
	handleKeyEvent: function(event) {
		this.shiftPressed = event.shiftKey;
	},

	/**
	 *	Handles focus on the modal, avoiding it beeing
	 *	lost out of it.
	 *
	 *	@param object event Event.
	 */
	handleFocus: function(event) {
		var index = this.shiftPressed
			? this.focusable.length - 1
			: 0;

		this.focusable[index].focus();
	},

	/**
	 *
	 */
	render: function() {
		return (
			<div>
				<div onFocus={this.handleFocus} tabIndex="0" />

				<div ref="children">
					{this.props.children}
				</div>

				<div onFocus={this.handleFocus} tabIndex="0" />
			</div>
		);
	}
});
