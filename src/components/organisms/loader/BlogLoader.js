import React from "react";
import Skeleton from "react-loading-skeleton";

function BlogLoader() {
	return (
		<div className="container ">
			<div className="columns">
				<div className="column is-12">
					<Skeleton height={100} />
				</div>
			</div>
			<div className="columns">
				<div className="column is-1 is-offset-1">
					<Skeleton height={40} />
				</div>
				<div className="column is-8">
					<Skeleton height={350} />
				</div>
			</div>
			<div className="columns">
				<div className="column is-8 is-offset-2">
					<Skeleton height={150} />
				</div>
			</div>
			<div className="columns">
				<div className="column is-8 is-offset-2">
					<Skeleton height={150} />
				</div>
			</div>
			<div className="columns">
				<div className="column is-4">
					<Skeleton height={150} />
				</div>
				<div className="column is-4">
					<Skeleton height={150} />
				</div>
				<div className="column is-4">
					<Skeleton height={150} />
				</div>
			</div>
		</div>
	);
}

export default BlogLoader;
