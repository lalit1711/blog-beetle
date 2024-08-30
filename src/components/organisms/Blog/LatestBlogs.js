import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import _cloneDeep from "lodash/cloneDeep";
import LargeBlogCard from "../../molecules/largeBlogCard";
import BriefCard from "../../molecules/breifCard";

function LatestBlogs({ blogsList, triggered, setTriggered }) {
	const [sectionOne, setSectionOne] = useState([]);
	const [sectionTwo, setSectionTwo] = useState([]);

	useEffect(() => {
		const tempBlogs = _cloneDeep(blogsList);
		setSectionOne(tempBlogs.splice(0, tempBlogs.length / 2));
		setSectionTwo(tempBlogs.splice(0, tempBlogs.length));
	}, [blogsList]);
	return (
		<div className="columns latest-blog-container is-paddingless">
			<div className="column is-1"></div>
			{blogsList.length ? (
				<div className="column is-10">
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
							L
						</span>
						atest blog posts
					</h1>
					<div className="columns">
						<div className="column is-9">
							{_map(sectionOne, o =>
								renderLargeCard(o, triggered, setTriggered)
							)}
						</div>
						<div
							className="vl is-hidden-touch"
							style={{ height: "auto" }}></div>
						<div className="column ispaddingless">
							<div className="subtitle column ispaddingless">More Blogs</div>
							{_map(sectionTwo, renderBriefCard)}
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

function renderLargeCard(blog, triggered, setTriggered) {
	return (
		<div className="column is-11" key={blog.id}>
			<LargeBlogCard
				blogInfo={blog}
				triggered={triggered}
				setTriggered={setTriggered}
			/>
			<hr />
		</div>
	);
}
function renderBriefCard(blog) {
	return (
		<div className=" mt-5" key={blog.id}>
			<BriefCard blogInfo={blog} />
			<hr />
		</div>
	);
}

export default LatestBlogs;
