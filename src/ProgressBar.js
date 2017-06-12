var React = require('react');
var ReactDom = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var uid = require('uid');
var findDOMNode = ReactDom.findDOMNode;
var ProgressBar = ReactBootstrap.ProgressBar;



/**
 *	A wrapper that adds an accessibility layer to the
 *	standard ProgressBar.
 */
module.exports = React.createClass({

	getDefaultProps() {
		return {
			id: uid()
		};
	},

	componentDidMount() {
		if (this.node) {
			this.setupTitle();
			this.updateText();
		}

		if (this.props.target) {
			this.setupTarget();
			this.updateTarget();
		}
	},

	componentDidUpdate() {
		if (this.node) {
			this.updateText();
		}

		if (this.props.target) {
			this.updateTarget();
		}
	},

	/**
	 *
	 */
	setupTitle() {
		this.node.setAttribute('title', this.props.title);
	},

	/**
	 *	Adds an aria-describedby attribute on the target
	 *	element to link it to the progress bar.
	 */
	setupTarget() {
		this.props.target.setAttribute('aria-describedby', this.props.id);
	},

	/**
	 *	Adds an aria-busy attribute on the target element
	 *	to tell if it is currently updating.
	 */
	updateTarget() {
		var min = this.props.min || ReactBootstrap.ProgressBar.defaultProps.min;
		var max = this.props.max || ReactBootstrap.ProgressBar.defaultProps.max;
		var busy = (this.props.now > min) && (this.props.now < max);

		this.props.target.setAttribute('aria-busy', busy);
	},

	/**
	 *	Updates the valuetext property of the progress bar.
	 */
	updateText() {
		if (this.props.now === undefined) {
			this.node.removeAttribute('aria-valuetext');
		} else {
			this.node.setAttribute('aria-valuetext', this.props.label);
		}
	},

	/**
	 *
	 */
	referenceNode(progressBar) {
		// si la progress bar est enfant d'une autre, elle retourne directement
		// une node [role="progressbar"]
		if (this.props.isChild) {
			this.node = findDOMNode(progressBar);

		// sinon, si elle n'a pas de composants enfants elle retourne une div qui
		// contient une node [role="progressbar"]
		} else if (!this.props.children) {
			this.node = findDOMNode(progressBar).childNodes[0];
		}
	},

	/**
	 *	Renders the progress bar.
	 */
	render() {
		return (
			<ProgressBar
				{...this.props}
				ref={this.referenceNode}
				title={null} // voir setupTitle()
			/>
		);
	}
});
