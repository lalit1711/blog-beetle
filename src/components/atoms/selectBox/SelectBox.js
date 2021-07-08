import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "./../../../config/axios"

function ComponentName({ ...props }) {
	let { inputData ,setInterests} = props;
	const [dropDownOptions, setDropDownOptions] = useState(false)
	const [dropDownVal, setDropDownValue] = useState(inputData?getOptions(inputData.split(","), true):[])

	useEffect(() => {
		getCategoriesList()
	}, [])

	const onChange = (value, { action, removedValue }) => {
		console.log("==SEEME*", getOptions(inputData.split(","), true))
		if (action === "clear") {
			setDropDownValue([])
		}
		if (action === "select-option") {
			if (value.length <= 3) {
				setDropDownValue(value);
				let interestChanges=value.map(item=>item.value)
					setInterests(interestChanges.toString())				
			}
		}


	}


	const getCategoriesList = async () => {
		let response = await axios.get("/categories");
		if (response.status === 200) {
			setDropDownOptions(getOptions(response.data))
		}
		console.log("===CategoriesList: ", response)
	}

	return (
		<Select
			id="select-box"
			options={dropDownOptions}
			classNamePrefix="select"
			placeholder="please select"
			{...props}
			onChange={onChange}
			value={dropDownVal}
		/>
	);
}

const getOptions = (data, existing = false) => {
	console.log("---LOP", data)
	return data.map(item => {
		if (existing)
			return { label: item, value: item }
		else
			return { label: item.categoryName, value: item.categoryName }

	})
}

export default ComponentName;
