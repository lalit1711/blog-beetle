import axios from "axios";
import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
function BlogsOfAuthor() {
	const [blogList, setBlogsList] = useState([]);

	useEffect(() => {
		axios.get("/blogs").then(res => setBlogsList(res.data));
	}, []);
	return (
		<div className="authors-blogs">
			{_map(blogList, blog => {
				return (
					<div className="blog">
						<LargeBlogCard blogInfo={blog} />
						<hr />
					</div>
				);
			})}
		</div>
	);
}

export default BlogsOfAuthor;
