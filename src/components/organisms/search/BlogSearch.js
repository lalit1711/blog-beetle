import React, { Fragment } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";

function BlogSearch({ blogsList }) {
	return (
		<div style={{ margin: 10, marginTop: "5%" }}>
			{blogsList.length > 0 ? (
				<Fragment>
					{_map(blogsList, blog => (
						<Fragment>
							<LargeBlogCard blogInfo={blog} />
							<hr />
						</Fragment>
					))}
				</Fragment>
			) : (
				<div className="no-item-message">Nothing to display</div>
			)}
		</div>
	);
}

export default BlogSearch;
