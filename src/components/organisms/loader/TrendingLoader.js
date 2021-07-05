import React from "react";
import Skeleton from "react-loading-skeleton";

function TrendingLoader() {
	return (
		<div className="columns trending-blogs-container ">
			<div className="column is-1"></div>

			<div className="column is-10">
				{/* <div className="title">Trending blogs</div> */}
				<div className="columns">
					<div className="column is-8 ">
						<Skeleton height={250} />
					</div>
					<div className="column">
						<Skeleton height={250} />
					</div>
				</div>

				<div className="columns">
					<div className="column">
						<Skeleton height={250} />
					</div>

					<div className="column">
						<Skeleton height={250} />
					</div>

					<div className="column">
						<Skeleton height={250} />
					</div>
				</div>
			</div>

			<div className="column is-1"></div>
		</div>
	);
}

export default TrendingLoader;
