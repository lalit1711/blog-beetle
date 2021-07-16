import React, { Fragment } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import ReactLottie from "../../../animation/LottieReact";

function BlogSearch({ blogsList }) {
	return (
		<div style={blogsList.length ? { margin: 10, marginTop: "5%" } : {}}>
			{blogsList.length > 0 ? (
				<Fragment>
					{_map(blogsList, blog => (
						<Fragment>
							<LargeBlogCard blogInfo={blog} />
							<hr />
						</Fragment>
					))}
				</Fragment>
			) : (
				<><ReactLottie keyIndex={3} />
					<h1 className="noResults">No results found</h1>
					<h4 className="noResultsSub">We could not find any blogs based on your search
					</h4>
				</>
			)}
		</div>
	);
}

export default BlogSearch;
