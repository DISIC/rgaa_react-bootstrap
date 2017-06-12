var React = require('react');
var render = require('react-dom').render;
var testProgressBar = require('rgaa-test-suite').progressBar;
var ProgressBar = require('../src/ProgressBar');



/**
 *
 */
function progressBarFactory(options) {
	var node = document.createElement('div');
	var label = options.value + '%';

	render((
		<ProgressBar
			min={options.min}
			max={options.max}
			now={options.value}
			label={label}
		/>
	), node);

	return node;
}

/**
 *
 */
describe(
	'React Bootstrap ProgressBar',
	testProgressBar(progressBarFactory)
);
