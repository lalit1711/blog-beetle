import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import { useParams } from "react-router";
import { _getAuthorsPublishedBlogs } from "../../../pages/authorpage/services";

function BlogsOfAuthor() {
	const [blogList, setBlogsList] = useState([]);
	const params = useParams();

	useEffect(() => {
		if (!params.id) return;
		_getAuthorsPublishedBlogs(params.id).then(res => setBlogsList(res.data));
	}, [params.id]);
	return (
		<div className="authors-blogs">
			{_map(blogList, blog => {
				return (
					<div className="blog" key={blog.id}>
						<LargeBlogCard blogInfo={blog} />
						<hr />
					</div>
				);
			})}
		</div>
	);
}

export default BlogsOfAuthor;
