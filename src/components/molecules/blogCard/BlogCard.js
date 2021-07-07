import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import BlogReader from "../../../readers/blog";
import categories from "../../../constants/categories";
import { FaUser } from "react-icons/fa";
import { _getAuthorInfo } from "../../../services/services";
import LikeSaveShare from "../../organisms/Blog/LikeSaveShare";

function BlogCard({ blogInfo }) {
	const [authorInfo, setAuthorInfo] = useState(null);
	useEffect(() => {
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data);
		});
	}, [blogInfo.authorId]);
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
						<span className="blog-author-card has-text-weight-bold is-uppercase is-flex">
							<span>
								<FaUser />
								{authorInfo && authorInfo.fullName}
							</span>
							<span>
								<LikeSaveShare
									blogInfo={blogInfo}
									fixed={true}
									onlyView={true}
								/>
							</span>
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default BlogCard;
