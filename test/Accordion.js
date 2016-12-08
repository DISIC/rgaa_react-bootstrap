var React = require('react');
var render = require('react-dom').render;
var ReactBootstrap = require('react-bootstrap');
var testAccordion = require('rgaa-test-suite').accordion;
var Accordion = require('../src/Accordion');



/**
 *
 */
function accordionFactory(options) {
	var node = document.createElement('div');
	var selected = options.panels.reduce(function(keys, panel, i) {
		return panel.selected
			? keys.concat('tab' + i)
			: keys;
	}, []);

	render((
		<Accordion defaultActiveKeys={selected}>
			{options.panels.map(function(panel, i) {
				return (
					<ReactBootstrap.Panel
						key={i}
						id={'tab' + i}
						eventKey={'tab' + i}
						header={panel.title}
					>
						{panel.content}
					</ReactBootstrap.Panel>
				);
			})}
		</Accordion>
	), node);

	return node;
}

/**
 *
 */
describe.only(
	'React Bootstrap Accordion',
	testAccordion(accordionFactory)
);
