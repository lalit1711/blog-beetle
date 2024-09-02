import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import { useParams } from "react-router";
import { _getAuthorsPublishedBlogs } from "../../../pages/authorpage/services";
import Skeleton from "react-loading-skeleton";
import ReactLottie from "../../../animation/LottieReact";
import { Fragment } from "react";

function BlogsOfAuthor() {
	const [blogList, setBlogsList] = useState([]);
	const [loader, setLoader] = useState(false);
	const [triggered, setTriggered] = useState(false);
	const params = useParams();

	useEffect(() => {
		if (!params.id) return;
		setLoader(true);
		_getAuthorsPublishedBlogs(params.id).then(res => {
			setBlogsList(res.data.data.blogs);
			setLoader(false);
		});
	}, [params.id, triggered]);

	if (loader) return <Skeleton height={200} />;
	return (
		<div className="authors-blogs">
			{blogList.length ? (
				<Fragment>
					{_map(blogList, blog => {
						return (
							<div className="blog" key={blog._id}>
								<LargeBlogCard
									blogInfo={blog}
									triggered={triggered}
									setTriggered={setTriggered}
								/>
								<hr />
							</div>
						);
					})}
				</Fragment>
			) : (
				<div style={{ minHeight: 200 }}>
					<ReactLottie keyIndex={4} />
					<h1 className="noResults">No Blogs</h1>
				</div>
			)}
		</div>
	);
}

export default BlogsOfAuthor;
