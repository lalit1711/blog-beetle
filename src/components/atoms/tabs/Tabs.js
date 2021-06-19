import React from "react";

function Tabs() {
	return (
		<div className="tabs">
			<ul>
				<li className="is-active">
					<span>Pictures</span>
				</li>
				<li>
					<span>Music</span>
				</li>
				<li>
					<span>Videos</span>
				</li>
				<li>
					<span>Documents</span>
				</li>
			</ul>
		</div>
	);
}

export default Tabs;
