import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import BlogCard from "../../molecules/blogCard";
import axios from "axios";
import { reset } from "aphrodite";
import { requestDataSavedBlog } from "../../../helpers/util";
import { useParams } from "react-router";

function SavedBlogs() {
	const [blogList, setBlogsList] = useState([]);
	const params = useParams();
	const userId = params.id;

	useEffect(() => {
		axios
			.get(
				"/saved-blogs?filter=" +
					encodeURIComponent(JSON.stringify(requestDataSavedBlog(userId)))
			)
			.then(res => {
				console.log("----savedBlogs----", res.data);
				const requestData = getSavedBlogRequestData(
					res.data.map(item => item.blogId)
				);
				axios
					.get(
						"/blogs?filter=" + encodeURIComponent(JSON.stringify(requestData))
					)
					.then(res => setBlogsList(res.data));
			});
	}, []);

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
