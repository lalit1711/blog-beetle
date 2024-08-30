import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "./../../../config/axios";
import { categoriesArray } from "../../../constants/categories";

function ComponentName({ ...props }) {
	let { inputData, setInterests } = props;
	const [dropDownOptions, setDropDownOptions] = useState(false);
	const [dropDownVal, setDropDownValue] = useState(
		inputData ? getOptions(inputData, true) : []
	);

	useEffect(() => {
		getCategoriesList();
	}, []);

	const onChange = (value, { action, removedValue }) => {
		if (action === "clear") {
			setDropDownValue([]);
		}
		if (action === "select-option") {
			if (value.length <= 3) {
				setDropDownValue(value);
				let interestChanges = value.map(item => item.value);
				setInterests(interestChanges);
			}
		}
	};

	const getCategoriesList = async () => {
		setDropDownOptions(getOptions(categoriesArray()));
	};

	return (
		<Select
			id="select-box"
			options={dropDownOptions}
			classNamePrefix="select"
			placeholder="Category"
			{...props}
			onChange={onChange}
			value={dropDownVal}
		/>
	);
}

const getOptions = (data, existing = false) => {
	return data.map(item => {
		if (existing) return { label: item, value: item };
		else return { label: item.categoryName, value: item.categoryName };
	});
};

export default ComponentName;
