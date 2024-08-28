import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import { useParams } from "react-router";
import { _getDraftBlogs } from "../../../pages/authorpage/services";
import Skeleton from "react-loading-skeleton";
import { Fragment } from "react";
import ReactLottie from "../../../animation/LottieReact";

function Draft() {
	const [blogList, setBlogsList] = useState([]);
	const [triggered, setTriggered] = useState(false);
	const [loader, setLoader] = useState(false);

	const params = useParams();
	const userId = params.id;

	useEffect(() => {
		setLoader(true);
		_getDraftBlogs().then(res => {
			setBlogsList(res.data.data);
			setLoader(false);
		});
	}, [userId, triggered]);

	if (loader) return <Skeleton height={200} />;
	return (
		<div className="authors-blogs">
			{blogList.length ? (
				<Fragment>
					{_map(blogList, blog => {
						return (
							<div className="blog">
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
					<h1 className="noResults">There is Nothing in Drafts</h1>
				</div>
			)}
		</div>
	);
}

export default Draft;
