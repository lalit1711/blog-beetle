import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import _noop from "lodash/noop";

//styles
import "./categoryTile.module.scss";

function CategoryTile(props) {
	const { selected, onClick } = props;
	const tileClasses = classnames("card", "is-flex", "category-tile", {
		"category-tile-selected": selected
	});
	return (
		<div className={tileClasses} onClick={onClick}>
			<div className="card-content">
				<p className="title">Frontend</p>
			</div>
		</div>
	);
}

CategoryTile.propTypes = {
	selected: PropTypes.bool,
	onClick: PropTypes.func
};

CategoryTile.defaultTypes = {
	selected: false,
	onClick: _noop
};

export default CategoryTile;
