import React, { Fragment } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";

function BlogSearch({ blogsList }) {
	return (
		<div style={{ marginTop: "5%" }}>
			{_map(blogsList, blog => (
				<Fragment>
					<LargeBlogCard blogInfo={blog} />
					<br />
					<hr />
					<br />
				</Fragment>
			))}
		</div>
	);
}

export default BlogSearch;
