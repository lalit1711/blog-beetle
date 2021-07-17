import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import { useParams } from "react-router";
import { _getDraftBlogs } from "../../../pages/authorpage/services";

function Draft() {
	const [blogList, setBlogsList] = useState([]);
	const params = useParams();
	const userId = params.id;

	useEffect(() => {
		_getDraftBlogs(userId).then(res => setBlogsList(res.data));
	}, [userId]);
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

export default Draft;
