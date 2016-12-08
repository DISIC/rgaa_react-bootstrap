var React = require('react');
var render = require('react-dom').render;
var testDialog = require('rgaa-test-suite').dialog;
var Modal = require('react-bootstrap').Modal;



/**
 *
 */
function dialogFactory(options) {
	var open;
	var close;

	var Dialog = React.createClass({

		getInitialState() {
			return {
				show: false
			};
		},

		componentDidMount() {
			open = this.handleShow;
			close = this.handleHide;
		},

		handleShow() {
			this.setState({
				show: true
			});
		},

		handleHide() {
			this.setState({
				show: false
			});
		},

		render() {
			return (
				<Modal
					show={this.state.show}
					onHide={this.handleHide}
					aria-label="Dialog"
				>
					<Modal.Header closeButton>
						<Modal.Title>
							{options.title}
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						{options.content}
					</Modal.Body>
				</Modal>
			);
		}
	});

	var node = document.createElement('div');
	//document.body.appendChild(node);

	render(<Dialog />, node);

	return {
		open: open,
		close: close
	};
}

/**
 *
 */
describe.only(
	'React Bootstrap Modal',
	testDialog(dialogFactory)
);
