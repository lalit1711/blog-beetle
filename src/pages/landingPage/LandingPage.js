import React, { useEffect, useState } from "react";

import _map from "lodash/map";

// components import
import BlogCard from "../../components/molecules/blogCard";
import { _getAllBlogs } from "./services";

// blog reader
import BlogReader from "../../readers/blog";

function LandingPage() {
	const [blogsList, setBlogsList] = useState([]);
	useEffect(() => {
		_getAllBlogs().then(res => {
			setBlogsList(res.data);
		});
	}, []);
	return (
		<div className="landing-page">
			<div className="container">
				<div className="columns">
					<div className="column is-1"></div>
					<div className="column is-10">
						<div className="title">Blogs List</div>
						<div className="columns is-multiline">
							{_map(blogsList, renderBlogCard)}
						</div>
					</div>
					<div className="column is-1"></div>
				</div>
			</div>
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

export default LandingPage;
