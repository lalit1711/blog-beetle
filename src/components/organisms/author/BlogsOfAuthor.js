import axios from "axios";
import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import { useParams } from "react-router";
import { requestBlogDataForUser } from "../../../helpers/util";

function BlogsOfAuthor() {
	const [blogList, setBlogsList] = useState([]);
	const params = useParams();

	useEffect(() => {
		if (!params.id) return;
		axios
			.get(
				"/blogs?filter=" +
					encodeURIComponent(JSON.stringify(requestBlogDataForUser(params.id)))
			)
			.then(res => setBlogsList(res.data));
	}, [params.id]);
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
