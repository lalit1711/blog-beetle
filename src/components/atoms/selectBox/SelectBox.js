import React from "react";
import Select from "react-select";

function componentName({ ...props }) {
	return (
		<Select
			id="select-box"
			classNamePrefix="select"
			placeholder="Category"
			{...props}
		/>
	);
}

export default componentName;
