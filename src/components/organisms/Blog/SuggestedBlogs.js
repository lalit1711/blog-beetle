import React, { useContext, useEffect, useState } from "react";
import _map from "lodash/map";
import { requestData } from "../../../helpers/util";
import BlogCard from "../../molecules/blogCard";
import BlogReader from "../../../readers/blog";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import { _getFilterBlogs } from "../../../pages/landingPage/services";

function SuggestedBlogs({
	search = false,
	categories = [],
	title = true,
	fullWidth = false,
	blogId = null
}) {
	const [blogsList, setBlogsList] = useState([]);
	const [triggered, setTriggered] = useState(false);
	const { user } = useContext(AuthenticatorContext);

	useEffect(() => {
		_getFilterBlogs(
			"/blogs?filter=" +
				encodeURIComponent(JSON.stringify(requestData(getFilterObject())))
		).then(res => filterBlogs(res.data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, categories, triggered]);

	const getFilterObject = () => {
		return categories.map(o => {
			return { categories: o };
		});
	};

	const filterBlogs = blogs => {
		const data = blogs
			.filter(e => e.published === "1")
			.filter(e => e.id !== blogId);
		if (search) setBlogsList(data);
		else setBlogsList(user ? data.filter(o => o.authorId !== user.id) : data);
	};

	return (
		<div className="columns">
			{!fullWidth && <div className="column is-1"></div>}
			<div className="column ">
				{title && (
					<h1
						style={{
							textAlign: "center",
							fontSize: "25px",
							fontWeight: "bold",
							marginBottom: "50px"
						}}>
						{" "}
						<span
							style={{
								fontSize: "45px",
								color: "#a3ce20",
								textDecoration: "underline"
							}}>
							S
						</span>
						uggested blogs
					</h1>
				)}
				<div className="columns is-multiline">
					{_map(blogsList, o => renderBlogCard(o, triggered, setTriggered))}
				</div>
			</div>
			{!fullWidth && <div className="column is-1"></div>}
		</div>
	);
}

function renderBlogCard(blog, triggered, setTriggered) {
	return (
		<div className="column is-4" key={BlogReader.id(blog)}>
			<BlogCard
				blogInfo={blog}
				triggered={triggered}
				setTriggered={setTriggered}
			/>
		</div>
	);
}

export default SuggestedBlogs;
