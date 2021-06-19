import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

function BlogCard({ blogInfo }) {
	const { title, blogContent, id } = blogInfo;
	return (
		<Link to={`/blog/${id}`}>
			<div className="card" style={{ height: 250 }}>
				<div className="card-content">
					<div className="content blog-card">
						<span className="tag is-info">Category</span>
						<span className="card-title">{title}</span>
						<hr />
						<span className="blog-description">
							{ReactHtmlParser(blogContent)}
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
