var React = require('react');
var render = require('react-dom').render;
var testTooltip = require('rgaa-test-suite').tooltip;
var Tooltip = require('react-bootstrap').Tooltip;
var TooltipOverlayTrigger = require('../src/TooltipOverlayTrigger');



/**
 *
 */
function tooltipFactory(options) {
	var node = document.createElement('div');
	var tooltip = (
		<Tooltip id="tooltip">
			{options.text}
		</Tooltip>
	);

	render((
		<TooltipOverlayTrigger overlay={tooltip}>
			<button>{options.text}</button>
		</TooltipOverlayTrigger>
	), node);

	return node;
}

/**
 *
 */
describe(
	'React Bootstrap Tooltip',
	testTooltip(tooltipFactory)
);
