import React from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import BlogReader from "../../../readers/blog";
import categories from "../../../constants/categories";

function BlogCard({ blogInfo }) {
	return (
		<Link to={`/blog/${BlogReader.id(blogInfo)}`}>
			<div className="card" style={{ height: 250 }}>
				<div className="card-content">
					<div className="content blog-card">
						<span
							className="tag is-info"
							style={{
								background:
									BlogReader.categories(blogInfo) &&
									categories[BlogReader.categories(blogInfo).trim()] &&
									categories[BlogReader.categories(blogInfo).trim()].color
							}}>
							{BlogReader.categories(blogInfo) || "Unknown"}
						</span>
						<span className="card-title">{BlogReader.title(blogInfo)}</span>
						<hr />
						<span className="blog-description">
							{ReactHtmlParser(BlogReader.blogContent(blogInfo))}
						</span>
						{/* <span className="blog-author-card has-text-weight-bold is-uppercase">
							<FaUser />
							Lalit
						</span> */}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default BlogCard;
