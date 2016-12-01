var React = require('react');
var ReactDom = require('react-dom');
var ReactBootstrap = require('react-bootstrap');



/**
 *	A wrapper that adds an accessibility layer to the
 *	standard Accordion.
 *	This is done in a completely "non-React" way, as it
 *	would require a rewrite of the components, making the
 *	changes harder to follow.
 */
module.exports = React.createClass({

	/**
	 *	Returns the initial state.
	 *
	 *	@return object State.
	 */
	getInitialState: function() {
		return {
			activeKey: this.props.defaultActiveKey || null
		};
	},

	/**
	 *	Attaches event handlers and sets up the markup.
	 */
	componentDidMount: function() {
		this.node = ReactDom.findDOMNode(this);
		this.tabs = this.node.querySelectorAll('.panel-heading a');
		this.panes = this.node.getElementsByClassName('panel-collapse');

		this.node.addEventListener('keydown', this.handleKeyDown);
		document.addEventListener('focus', this.handleFocus, true);

		this.setupAttributes();
		this.setupPanesAttributes();
		this.updatePanesAttributes();
	},

	/**
	 *	Detaches event handlers.
	 */
	componentWillUnmount: function() {
		this.node.removeEventListener('keydown', this.handleKeyDown);
		document.removeEventListener('focus', this.handleFocus, true);
	},

	/**
	 *	Sets up appropriate roles and ids on the elements.
	 */
	setupAttributes: function() {
		this.node.setAttribute('role', 'tablist');
		this.node.setAttribute('aria-multiselectable', 'false');
	},

	/**
	 *	Adds appropriate attributes on tabs and panes.
	 */
	setupPanesAttributes: function() {
		for (var i = 0, l = this.tabs.length; i < l; i++) {
			var tab = this.tabs[i];
			var pane = this.panes[i];
			var id = tab.getAttribute('id');

			if (!id) {
				id = 'tab-' + i;
				tab.setAttribute('id', id);
			}

			tab.setAttribute('role', 'tab');
			pane.setAttribute('role', 'tabpanel');
			pane.setAttribute('aria-labelledby', id);
		}
	},

	/**
	 *	Updates appropriate attributes on related tab and pane.
	 */
	updatePanesAttributes: function() {
		for (var i = 0, l = this.panes.length; i < l; i++) {
			var tab = this.tabs[i];
			var pane = this.panes[i];
			var isActive = (pane.getAttribute('aria-expanded') === 'true');

			pane.setAttribute('aria-hidden', isActive ? 'false' : 'true');
			tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
		}
	},

	/**
	 *	Returns the index of the active tab, i.e. the one
	 *	that is currently expanded.
	 *
	 *	@return int Index.
	 */
	activeTabIndex: function() {
		for (var i = 0, l = this.tabs.length; i < l; i++) {
			if (this.tabs[i].getAttribute('aria-selected') === 'true') {
				return i;
			}
		}

		return 0;
	},

	/**
	 *	Returns the index of the focused tab.
	 *
	 *	@return int Index.
	 */
	focusedTabIndex: function() {
		for (var i = 0, l = this.tabs.length; i < l; i++) {
			if (this.tabs[i] === document.activeElement) {
				return i;
			}
		}

		return 0;
	},

	/**
	 *	Sets focus on the active tab.
	 */
	focusActiveTab: function() {
		var index = this.activeTabIndex();
		this.tabs[index].focus();
	},

	/**
	 *	Focuses on a tab next to the currently focused one.
	 *
	 *	@param int direction Direction.
	 */
	focusSiblingTab: function(direction) {
		var index = this.focusedTabIndex() + direction;

		if (index < 0) {
			index = this.tabs.length - 1;
		}

		if (index > this.tabs.length - 1) {
			index = 0;
		}

		this.tabs[index].focus();
	},

	/**
	 *	Handles keyboard navigation through the tabs.
	 *
	 *	@param object event Event.
	 */
	handleKeyDown: function(event) {
		if (event.target.getAttribute('role') !== 'tab') {
			return;
		}

		switch (event.keyCode) {
			case 37: // left
			case 38: // up
				this.focusSiblingTab(-1);
				break;

			case 39: // right
			case 40: // down
				this.focusSiblingTab(1);
				break;

			case 32: // space
				event.target.click();
				break;

			default:
				return;
		}

		event.preventDefault();
	},

	/**
	 *
	 */
	handleFocus: function(event) {
		if (
			!this.node.contains(this.focused)
			&& this.node.contains(event.target)
		) {
			this.focusActiveTab();
		}

		this.focused = event.target;
	},

	/**
	 *	Selects the tab identified by the given key.
	 *
	 *	@param string key Tab key.
	 */
	handleSelect: function(key) {
		if (key === this.state.activeKey) {
			key = null;
		}

		this.setState({
			activeKey: key
		}, function() {
			this.updatePanesAttributes();

			if (this.state.activeKey !== null) {
				this.focusActiveTab();
			}
		});

		if (this.props.onSelect) {
			this.props.onSelect(key);
		}
	},

	/**
	 *	Renders the tabbed area.
	 */
	render: function() {
		return (
			<ReactBootstrap.Accordion
				activeKey={this.state.activeKey}
				onSelect={this.handleSelect}
			>
				{this.props.children}
			</ReactBootstrap.Accordion>
		);
	}
});
