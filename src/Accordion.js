var React = require('react');
var ReactDom = require('react-dom');
var ReactBootstrap = require('react-bootstrap');
var classNames = require('classnames');
var cloneElement = React.cloneElement;
var findDOMNode = ReactDom.findDOMNode;
var ValidComponentChildren = ReactBootstrap.utils.ValidComponentChildren;
var createChainedFunction = ReactBootstrap.utils.createChainedFunction;
var bsClass = ReactBootstrap.utils.bootstrapUtils.bsClass;
var getClassSet = ReactBootstrap.utils.bootstrapUtils.getClassSet;
var splitBsPropsAndOmit = ReactBootstrap.utils.bootstrapUtils.splitBsPropsAndOmit;



/**
 *	A wrapper that adds an accessibility layer to the
 *	standard Accordion.
 *	This is done in a completely "non-React" way, as it
 *	would require a rewrite of the components, making the
 *	changes harder to follow.
 */
var Accordion = React.createClass({

	/**
	 *
	 */
	getInitialState() {
		return {
			activeKeys: this.props.defaultActiveKeys || []
		};
	},

	/**
	 *	Attaches event handlers and sets up the markup.
	 */
	componentDidMount() {
		this.setupPanelsAttributes();
		this.updateTabsAttributes();
	},

	/**
	 *
	 */
	componentDidUpdate() {
		this.updateTabsAttributes();
	},

	/**
	 *	Adds appropriate attributes on tabs and panes.
	 */
	setupPanelsAttributes() {
		this.tabs.forEach(function(tab, i) {
			var id = tab.getAttribute('id');

			if (!id) {
				id = 'tab' + i;
				tab.setAttribute('id', id);
			}

			this.panels[i].setAttribute('aria-labelledby', id);
		}, this);
	},

	/**
	 *	Updates attributes.
	 */
	updateTabsAttributes() {
		this.tabs.forEach(function(tab) {
			this.makeFocusable(
				tab,
				tab.getAttribute('aria-selected') === 'true'
			);
		}, this);

		// If no tab is active, makes the first one focusable.
		if (this.state.activeKeys.length === 0) {
			this.makeFocusable(this.tabs[0], true);
		}
	},

	/**
	 *	Sets focus on the active tab.
	 */
	makeFocusable(node, focusable) {
		if (focusable) {
			node.removeAttribute('tabindex');
		} else {
			node.setAttribute('tabindex', '-1');
		}
	},

	/**
	 *	Returns the index of the focused tab.
	 *
	 *	@return int Index.
	 */
	focusedTabIndex() {
		var index = this.tabs.findIndex(function(tab) {
			return tab === document.activeElement;
		});

		return (index === -1) ? 0 : index;
	},

	/**
	 *	Focuses on a tab next to the currently focused one.
	 *
	 *	@param int direction Direction.
	 */
	focusSiblingTab(direction) {
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
	handleKeyDown(event) {
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
	handleSelect(eventKey) {
		var activeKeys = this.state.activeKeys;
		var index = activeKeys.indexOf(eventKey);

		if (index === -1) {
			activeKeys.push(eventKey);
		} else {
			activeKeys.splice(index, 1);
		}

		this.setState({
			activeKeys: activeKeys
		});
	},

	/**
	 *
	 */
	referenceNodes(panelGroup) {
		this.node = findDOMNode(panelGroup);
		this.tabs = [].slice.call(this.node.querySelectorAll('[role="tab"]'));
		this.panels = [].slice.call(this.node.querySelectorAll('[role="tabpanel"]'));
	},

	/**
	 *
	 */
	render() {
		var splittedProps= splitBsPropsAndOmit(this.props, ['onSelect']);
		var bsProps = splittedProps[0];
		var elementProps = splittedProps[1];
		var className = classNames(this.props.className, getClassSet(bsProps));

		return (
			<div
				{...elementProps}
				ref={this.referenceNodes}
				className={className}
				onKeyDown={this.handleKeyDown}
				role="tablist"
				aria-multiselectable
			>
				{ValidComponentChildren.map(
					this.props.children,
					function(child) {
						return cloneElement(child, {
							bsStyle: child.props.bsStyle || bsProps.bsStyle,
							headerRole: 'tab',
							panelRole: 'tabpanel',
							collapsible: true,
							expanded: this.state.activeKeys.includes(child.props.eventKey),
							onSelect: createChainedFunction(
								this.handleSelect,
								child.props.onSelect
							)
						});
					},
					this
				)}
			</div>
		);
	}
});

/**
 *
 */
module.exports = bsClass('panel-group', Accordion);
