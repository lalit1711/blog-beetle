import React from "react";
import Skeleton from "react-loading-skeleton";

function SuggestedLoader() {
	return (
		<div className="columns">
			<div className="column">
				<Skeleton height={200} />
			</div>
			<div className="column">
				<Skeleton height={200} />
			</div>
			<div className="column">
				<Skeleton height={200} />
			</div>
		</div>
	);
}

export default SuggestedLoader;
