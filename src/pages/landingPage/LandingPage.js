import React, { useEffect, useState } from "react";
// components import
import BlogCard from "../../components/molecules/blogCard";
import { _getAllBlogs } from "./services";
import Loader from "../../common/Loader";
import _map from "lodash/map";

// blog reader
import BlogReader from "../../readers/blog";
import LatestBlogs from "../../components/organisms/Blog/LatestBlogs";
import TrendingBlogs from "../../components/organisms/Blog/TrendingBlogs";

function LandingPage() {
	const [blogsList, setBlogsList] = useState([]);
	const [load, setLoad] = useState(false);
	useEffect(() => {
		setLoad(true);
		_getAllBlogs().then(res => {
			setBlogsList(res.data);
			setLoad(false);
		});
	}, []);
	return (
		<div className="landing-page">
			<div className="container">
				<TrendingBlogs blogsList={blogsList} />
				<br />
				<br />
				<br />
				<LatestBlogs blogsList={blogsList} />
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
				<br />
				<br />
				<br />
			</div>
			<Loader load={load} />
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
