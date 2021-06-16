import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import _noop from "lodash/noop";

// Constants
import BUTTON_TYPES from "./constants/buttonTypes";
import { DEFAULT_CHILDREN } from "./constants/button.general";

// styles
import styles from "./button.module.scss";

function Button(props) {
	const { type, outlined, disabled, onClick, loading, children } = props;
	const buttonClass = classnames("button", "is-rounded", {
		"is-outlined": outlined,
		"is-primary": type === BUTTON_TYPES.PRIMARY,
		"is-loading": loading,
		"is-disabled": disabled
	});
	return <button className={buttonClass}>{children}</button>;
}

Button.propTypes = {
	type: PropTypes.string,
	outlined: PropTypes.string,
	children: PropTypes.string,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	onClick: PropTypes.func
};

Button.defaultProps = {
	type: BUTTON_TYPES.PRIMARY,
	outlined: true,
	children: DEFAULT_CHILDREN,
	disabled: false,
	loading: false,
	onClick: _noop
};
export default Button;