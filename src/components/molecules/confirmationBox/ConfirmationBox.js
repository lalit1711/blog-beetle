import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import _noop from "lodash/noop";

// COMPONENTS
import Button from "../../atoms/button/Button";

// CONSTANTS
import {
	PRIMARY_BUTTON,
	SECONDARY_BUTTON,
	MESSAGE
} from "./constants/confirmation.general";

function ConfirmationBox(props) {
	const {
		secondaryAction,
		primaryAction,
		secondaryButton,
		primaryButton,
		onClose,
		open,
		message
	} = props;
	const modalClass = classnames("modal", { "is-active": open });
	return (
		<div className={modalClass}>
			<div className="modal-background"></div>
			<div className="modal-content">
				<div className="card">
					<div className="card-body">
						<div className="subtitle">{message}</div>
						<div className="actions">
							<Button type="light" onClick={secondaryAction}>
								{secondaryButton}
							</Button>
							<Button onClick={primaryAction}>{primaryButton} </Button>
						</div>
					</div>
				</div>
			</div>
			<button
				className="modal-close is-large"
				aria-label="close"
				onClick={onClose}></button>
		</div>
	);
}

ConfirmationBox.propTypes = {
	secondaryAction: PropTypes.func,
	primaryAction: PropTypes.func,
	secondaryButton: PropTypes.string,
	primaryButton: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool,
	message: PropTypes.string
};

ConfirmationBox.defaultProps = {
	secondaryAction: _noop,
	primaryAction: _noop,
	secondaryButton: SECONDARY_BUTTON,
	primaryButton: PRIMARY_BUTTON,
	onClose: _noop,
	open: false,
	message: MESSAGE
};

export default ConfirmationBox;
