import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import BlogReader from "../../../readers/blog";

function BlogCard({ blogInfo }) {
	return (
		<Link to={`/blog/${BlogReader.id(blogInfo)}`}>
			<div className="card" style={{ height: 250 }}>
				<div className="card-content">
					<div className="content blog-card">
						<span className="tag is-info">Category</span>
						<span className="card-title">{BlogReader.title(blogInfo)}</span>
						<hr />
						<span className="blog-description">
							{ReactHtmlParser(BlogReader.blogContent(blogInfo))}
						</span>
						<span className="blog-author-card has-text-weight-bold is-uppercase">
							<FaUser />
							Lalit
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default BlogCard;
