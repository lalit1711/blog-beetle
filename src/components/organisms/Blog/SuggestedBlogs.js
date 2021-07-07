import React, { useContext, useEffect, useState } from "react";
import _map from "lodash/map";
import { requestData } from "../../../helpers/util";
import BlogCard from "../../molecules/blogCard";
import BlogReader from "../../../readers/blog";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import { _getFilterBlogs } from "../../../pages/landingPage/services";

function SuggestedBlogs({ landingPage = true, categories = [] }) {
	const [blogsList, setBlogsList] = useState([]);
	const { user } = useContext(AuthenticatorContext);

	useEffect(() => {
		_getFilterBlogs(
			"/blogs?filter=" +
				encodeURIComponent(JSON.stringify(requestData(getFilterObject())))
		).then(res =>
			setBlogsList(
				landingPage ? res.data.filter(o => o.authorId !== user.id) : res.data
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const getFilterObject = () => {
		if (user)
			return categories.map(o => {
				return { categories: o };
			});
	};

	return (
		<div className="columns">
			<div className="column is-1"></div>
			<div className="column is-10">
				<div className="title">Suggested blogs</div>
				<div className="columns is-multiline">
					{_map(blogsList, renderBlogCard)}
				</div>
			</div>
			<div className="column is-1"></div>
		</div>
	);
}

function renderBlogCard(blog) {
	return (
		<div className="column is-4" key={BlogReader.id(blog)}>
			<BlogCard blogInfo={blog} />
		</div>
	);
}

export default SuggestedBlogs;
