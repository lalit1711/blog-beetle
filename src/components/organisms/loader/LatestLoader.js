import React from "react";
import Skeleton from "react-loading-skeleton";

function LatestLoader() {
	return (
		<div className="columns latest-blog-container">
			<div className="column is-1"></div>
			<div className="column is-10">
				<div className="columns">
					<div className="column is-9">
						<div className="column">
							<Skeleton height={300} />
						</div>
						<div className="column">
							<Skeleton height={300} />
						</div>
					</div>
					<div className="column vl">
						<div className="column">
							<Skeleton height={100} />
						</div>
						<div className="column">
							<Skeleton height={100} />
						</div>
						<div className="column">
							<Skeleton height={100} />
						</div>
						<div className="column">
							<Skeleton height={100} />
						</div>
					</div>
				</div>
			</div>

			<div className="column is-1"></div>
		</div>
	);
}

export default LatestLoader;
