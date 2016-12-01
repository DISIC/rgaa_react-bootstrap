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
		this.setupTitles();
		this.setupTarget();

		this.updateTexts();
		this.updateTarget();
	},

	componentDidUpdate: function() {
		this.updateTexts();
		this.updateTarget();
	},

	/**
	 *
	 */
	childNodes: function() {
		var node = ReactDom.findDOMNode(this);
		return [].slice.call(node.childNodes);
	},

	/**
	 *
	 */
	setupTitles: function() {
		this.childNodes().forEach(function(node) {
			node.setAttribute('title', this.props.label);
		}, this);
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

		var min = this.props.min || ReactBootstrap.ProgressBar.defaultProps.min;
		var max = this.props.max || ReactBootstrap.ProgressBar.defaultProps.max;
		var busy = (this.props.now > min) && (this.props.now < max);

		this.props.target.setAttribute('aria-busy', busy);
	},

	/**
	 *	Updates the valuetext property of the children
	 *	progress bars.
	 */
	updateTexts: function() {
		this.childNodes().forEach(function(node) {
			if (this.props.now === undefined) {
				node.removeAttribute('aria-valuetext');
			} else {
				node.setAttribute('aria-valuetext', this.props.label);
			}
		}, this);
	},

	/**
	 *	Renders the progress bar.
	 */
	render: function() {
		return <ReactBootstrap.ProgressBar {...this.props} />;
	}
});
