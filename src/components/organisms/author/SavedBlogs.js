import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import BlogCard from "../../molecules/blogCard";
import axios from "axios";
import { reset } from "aphrodite";
import { requestDataSavedBlog } from "../../../helpers/util";
import { useParams } from "react-router";
import SuggestedLoader from "../loader/SuggestedLoader";

function SavedBlogs() {
	const [blogList, setBlogsList] = useState([]);
	const [loader, setLoader] = useState([]);
	const params = useParams();
	const userId = params.id;

	useEffect(() => {
		setLoader(true);
		axios
			.get(
				"/saved-blogs?filter=" +
					encodeURIComponent(JSON.stringify(requestDataSavedBlog(userId)))
			)
			.then(res => {
				const requestData = getSavedBlogRequestData(
					res.data.map(item => item.blogId)
				);
				axios
					.get(
						"/blogs?filter=" + encodeURIComponent(JSON.stringify(requestData))
					)
					.then(res => {
						setBlogsList(res.data);
						setLoader(false);
					});
			});
	}, []);

	if (!loader)
		return (
			<div className="authors-blogs columns is-multiline">
				{_map(blogList, blog => {
					return (
						<div className="column is-4">
							<BlogCard blogInfo={blog} />
						</div>
					);
				})}
			</div>
		);
	return <SuggestedLoader />;
}

function getSavedBlogRequestData(blogIdArray) {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			id: { inq: blogIdArray }
		},
		fields: {
			id: true,
			title: true,
			coverImgSrc: true,
			subTitle: true,
			authorId: true,
			blogContent: true,
			published: true,
			categories: true,
			createdAt: true,
			updatedAt: true
		}
	};
}

export default SavedBlogs;
