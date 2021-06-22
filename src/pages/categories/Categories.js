import React from "react";
import CategoryTile from "../../components/atoms/categoryTile";

function Categories() {
	return (
		<div className=" categories-container columns">
			<div className="column is-2"></div>
			<div className="column is-8">
				<div className="columns is-multiline">
					<div className="column is-3">
						<CategoryTile />
					</div>
					<div className="column is-3">
						<CategoryTile selected />
					</div>
					<div className="column is-3">
						<CategoryTile />
					</div>
					<div className="column is-3">
						<CategoryTile selected />
					</div>
					<div className="column is-3">
						<CategoryTile />
					</div>
					<div className="column is-3">
						<CategoryTile selected />
					</div>
					<div className="column is-3">
						<CategoryTile />
					</div>
					<div className="column is-3">
						<CategoryTile />
					</div>
				</div>
			</div>
			<div className="column is-2"></div>
		</div>
	);
}

export default Categories;
