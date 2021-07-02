import React, { Fragment } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";

function BlogSearch({ blogsList }) {
	return (
		<div style={{ margin: 10, marginTop: "5%" }}>
			{_map(blogsList, blog => (
				<Fragment>
					<LargeBlogCard blogInfo={blog} />
					<hr />
				</Fragment>
			))}
		</div>
	);
}

export default BlogSearch;
