import React from "react";
import Select from "react-select";

function componentName({ ...props }) {
	return (
		<Select
			id="select-box"
			options={tempOptions}
			classNamePrefix="select"
			placeholder="please select"
			{...props}
		/>
	);
}

const tempOptions = [
	{ label: "Lalit", value: "lalit" },
	{ value: "Anshu", label: "Anshu" }
];

export default componentName;
