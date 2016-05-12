var React = require('react');
var ReactBootstrap = require('react-bootstrap');



/**
 *	A wrapper that adds an accessibility layer to the
 *	standard TabbedArea.
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
		this.tabList = React.findDOMNode(this.refs.area.refs.tabs);
		this.tabs = this.tabList.getElementsByTagName('a');

		this.paneList = React.findDOMNode(this.refs.area.refs.panes);
		this.panes = this.paneList.children;

		this.tabList.addEventListener('keydown', this.handleKeyDown);

		this.setupAttributes();
		this.updateAttributes();
	},

	/**
	 *	Detaches event handlers.
	 */
	componentWillUnmount: function() {
		this.tabList.removeEventListener('keydown', this.handleKeyDown);
	},

	/**
	 *	Sets up appropriate roles and ids on the elements.
	 */
	setupAttributes: function() {
		this.tabList.setAttribute('role', 'tablist');

		for (var i = 0, l = this.panes.length; i < l; i++) {
			var tab = this.tabs[i];
			var pane = this.panes[i];
			var id = pane.getAttribute('id');

			if (!id) {
				id = 'pane-' + i;
				pane.setAttribute('id', id);
			}

			tab.setAttribute('aria-controls', id);
			tab.setAttribute('role', 'tab');
			pane.setAttribute('role', 'tabpanel');
		}
	},

	/**
	 *	Activates a tab, thus disabling the other ones.
	 */
	updateAttributes: function() {
		var ref = 'tab' + this.state.activeKey;
		var active = React.findDOMNode(this.refs.area.refs[ref].refs.anchor);

		for (var i = 0, l = this.tabs.length; i < l; i++) {
			var tab = this.tabs[i];
			var isActive = (tab === active);

			tab.setAttribute('tabindex', isActive ? 0 : -1)
			tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
		}
	},

	/**
	 *	Sets focus on the active tab.
	 */
	focusActiveTab: function() {
		var ref = 'tab' + this.state.activeKey;
		var active = React.findDOMNode(this.refs.area.refs[ref].refs.anchor);

		active.focus();
	},

	/**
	 *	Handles keyboard navigation through the tabs.
	 *
	 *	@param object event Event.
	 */
	handleKeyDown: function(event) {
		var ref = 'tab' + this.refs.area.getActiveKey();
		var node = React.findDOMNode(this.refs.area.refs[ref]);
		var next;

		switch (event.keyCode) {
			case 37: // left
			case 38: // up
				next = node.previousElementSibling || node.parentElement.lastChild;
				break;

			case 39: // right
			case 40: // down
				next = node.nextElementSibling || node.parentElement.firstChild;
				break;

			default:
				return;
		}

		event.preventDefault();
		next.firstElementChild.click();
	},

	/**
	 *	Selects the tab identified by the given key.
	 *
	 *	@param string key Tab key.
	 */
	handleSelect: function(key) {
		this.setState({
			activeKey: key
		}, function() {
			this.updateAttributes();
			this.focusActiveTab();
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
			<ReactBootstrap.TabbedArea
				ref="area"
				activeKey={this.state.activeKey}
				onSelect={this.handleSelect}
			>
				{this.props.children}
			</ReactBootstrap.TabbedArea>
		);
	}
});
