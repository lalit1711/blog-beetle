import React, { useContext, useEffect, useState } from "react";
import _map from "lodash/map";
import { requestData } from "../../../helpers/util";
import BlogCard from "../../molecules/blogCard";
import BlogReader from "../../../readers/blog";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import { _getFilterBlogs } from "../../../pages/landingPage/services";

function SuggestedBlogs({
	landingPage = true,
	categories = [],
	title = true,
	fullWidth = false
}) {
	const [blogsList, setBlogsList] = useState([]);
	const [triggered, setTriggered] = useState(false);
	const { user } = useContext(AuthenticatorContext);

	useEffect(() => {
		_getFilterBlogs(
			"/blogs?filter=" +
				encodeURIComponent(JSON.stringify(requestData(getFilterObject())))
		).then(res => {
			const data = res.data.filter(e => e.published === "1");
			setBlogsList(
				landingPage ? data.filter(o => o.authorId !== user.id) : data
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, categories, triggered]);

	const getFilterObject = () => {
		if (user)
			return categories.map(o => {
				return { categories: o };
			});
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
