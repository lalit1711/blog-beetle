import React from "react";
import _map from "lodash/map";

function Tabs({ tabOptions, active, setActiveTab }) {
	function renderTabs(tab) {
		return (
			<li
				className={`${tab.index === active && "is-active"}`}
				onClick={() => setActiveTab(tab.index)}>
				<span>{tab.title}</span>
			</li>
		);
	}
	return (
		<div className="tabs">
			<ul>{_map(tabOptions, renderTabs)}</ul>
		</div>
	);
}

export default Tabs;
