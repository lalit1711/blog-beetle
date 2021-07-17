import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import BlogCard from "../../molecules/blogCard";
import { useParams } from "react-router";
import SuggestedLoader from "../loader/SuggestedLoader";
import { _getSavedBlogs } from "../../../pages/authorpage/services";

function SavedBlogs() {
	const [blogList, setBlogsList] = useState([]);
	const [loader, setLoader] = useState([]);
	const params = useParams();
	const userId = params.id;

	useEffect(() => {
		setLoader(true);
		_getSavedBlogs(userId).then(res => {
			setBlogsList(res);
			setLoader(false);
		});
		return () => {
			setBlogsList([]);
		};
	}, [userId]);

	if (!loader)
		return (
			<div className="authors-blogs columns is-multiline">
				{_map(blogList, blog => {
					return (
						<div className="column is-4" key={blog.id}>
							<BlogCard blogInfo={blog} />
						</div>
					);
				})}
			</div>
		);
	return <SuggestedLoader />;
}

export default SavedBlogs;
