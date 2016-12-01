var React = require('react');
var ReactDom = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var uid = require('uid');



/**
 *	A wrapper that adds an accessibility layer to the
 *	standard ProgressBar.
 */
module.exports = React.createClass({

	getDefaultProps: function() {
		return {
			id: uid()
		};
	},

	componentDidMount: function() {
		this.updateTexts();
		this.setupTarget();
		this.updateTarget();
	},

	componentDidUpdate: function() {
		this.updateTexts();
		this.updateTarget();
	},

	/**
	 *	Adds an aria-describedby attribute on the target
	 *	element to link it to the progress bar.
	 */
	setupTarget: function() {
		if (this.props.target) {
			this.props.target.setAttribute(
				'aria-describedby',
				this.props.id
			);
		}
	},

	/**
	 *	Adds an aria-busy attribute on the target element
	 *	to tell if it is currently updating.
	 */
	updateTarget: function() {
		if (!this.props.target) {
			return;
		}

		var min = this.props.min || 0;
		var max = this.props.max || 100;
		var busy = (this.props.now > min) && (this.props.now < max);

		this.props.target.setAttribute('aria-busy', busy);
	},

	/**
	 *	Updates the valuetext property of the children
	 *	progress bars.
	 */
	updateTexts: function() {
		var node = ReactDom.findDOMNode(this.refs.progress);
		var children = node.childNodes;

		for (var i = 0, l = children.length; i < l; i++) {
			this.updateText(children[i]);
		}
	},

	/**
	 *	Updates the valuetext property of the given node.
	 *
	 *	@param object node Node.
	 */
	updateText: function(node) {
		var text = ('textContent' in node)
			? node.textContent
			: node.innerText;

		node.setAttribute('aria-valuetext', text);
	},

	/**
	 *	Renders the progress bar.
	 */
	render: function() {
		return <ReactBootstrap.ProgressBar ref="progress" {...this.props} />;
	}
});
