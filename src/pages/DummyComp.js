import React from "react";
import CategoryReader from "../readers/Category";

function DummyComp() {
	const dummyData = { id: "xyz", name: "Blog name" };
	return <div>{CategoryReader.categoryName(dummyData)}</div>;
}

export default DummyComp;
