var React = require('react');
var render = require('react-dom').render;
var ReactBootstrap = require('react-bootstrap');
var testTabPanel = require('rgaa-test-suite').tabPanel;
var Tab = ReactBootstrap.Tab;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;



/**
 *
 */
function tabPanelFactory(options) {
	var node = document.createElement('div');
	var selected = options.panels.findIndex(function(panel) {
		return panel.selected === true;
	});

	render((
		<Tab.Container defaultActiveKey={'tab' + selected} id="id">
			<Row>
				<Col>
					<Nav>
						{options.panels.map(function(panel, i) {
							return (
								<NavItem key={i} eventKey={'tab' + i}>
									{panel.title}
								</NavItem>
							);
						})}
					</Nav>
				</Col>

				<Col>
					<Tab.Content>
						{options.panels.map(function(panel, i) {
							return (
								<Tab.Pane key={i} eventKey={'tab' + i}>
									<div dangerouslySetInnerHTML={{
										__html: panel.content
									}} />
								</Tab.Pane>
							);
						})}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	), node);

	return node;
}

/**
 *
 */
describe(
	'React Bootstrap Tab.Container',
	testTabPanel(tabPanelFactory)
);
