import React, { useEffect, useState, Fragment } from "react";
import _map from "lodash/map";
import BlogCard from "../../molecules/blogCard";
import { useParams } from "react-router";
import SuggestedLoader from "../loader/SuggestedLoader";
import { _getSavedBlogs } from "../../../pages/authorpage/services";
import ReactLottie from "../../../animation/LottieReact";

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
				{blogList.length ? (
					<Fragment>
						{_map(blogList, blog => {
							return (
								<div className="column is-4" key={blog.id}>
									<BlogCard blogInfo={blog} />
								</div>
							);
						})}
					</Fragment>
				) : (
					<div style={{ minHeight: 200, width: "100%" }}>
						<ReactLottie keyIndex={4} />
						<h1 className="noResults">You haven't saved any Blog</h1>
					</div>
				)}
			</div>
		);
	return <SuggestedLoader />;
}

export default SavedBlogs;
