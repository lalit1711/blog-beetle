import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import _cloneDeep from "lodash/cloneDeep";
import LargeBlogCard from "../../molecules/largeBlogCard";
import BriefCard from "../../molecules/breifCard";

function LatestBlogs({ blogsList }) {
	const [sectionOne, setSectionOne] = useState([]);
	const [sectionTwo, setSectionTwo] = useState([]);

	useEffect(() => {
		const tempBlogs = _cloneDeep(blogsList);
		setSectionOne(tempBlogs.splice(0, tempBlogs.length / 2));
		setSectionTwo(tempBlogs.splice(0, tempBlogs.length));
	}, [blogsList]);
	return (
		<div className="columns latest-blog-container">
			<div className="column is-1"></div>
			{blogsList.length ? (
				<div className="column is-10">
					<div className="title" style={{ marginBottom: 50 }}>
						Latest blogs
					</div>
					<div className="columns">
						<div className="column is-9">
							{_map(sectionOne, renderLargeCard)}
						</div>
						<div className="column vl">
							<div className="subtitle">More Blogs</div>
							{_map(sectionTwo, renderBriefCard)}
						</div>
					</div>
				</div>
			) : null}
			<div className="column is-1"></div>
		</div>
	);
}

function renderLargeCard(blog) {
	return (
		<div className="column is-11" key={blog.id}>
			<LargeBlogCard blogInfo={blog} />
			<hr />
		</div>
	);
}
function renderBriefCard(blog) {
	return (
		<div className="column " key={blog.id}>
			<BriefCard blogInfo={blog} />
			<hr />
		</div>
	);
}

export default LatestBlogs;
