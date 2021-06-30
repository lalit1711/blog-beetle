import React from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";

function BlogSearch({ blogsList }) {
	return (
		<div style={{ marginTop: "5%" }}>
			{_map(blogsList, blog => (
				<LargeBlogCard blogInfo={blog} />
			))}
		</div>
	);
}

export default BlogSearch;
