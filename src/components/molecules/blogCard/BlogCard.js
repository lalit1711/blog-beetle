import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import BlogReader from "../../../readers/blog";
import categories from "../../../constants/categories";
import { FaUser } from "react-icons/fa";
import { _getAuthorInfo } from "../../../services/services";
import LikeSaveShare from "../../organisms/Blog/LikeSaveShare";
import ReactTimeAgo from "react-time-ago";

function BlogCard({ blogInfo, triggered = false, setTriggered = () => {} }) {
	const [authorInfo, setAuthorInfo] = useState(null);
	useEffect(() => {
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data);
		});
	}, [blogInfo.authorId, triggered]);
	return (
		<div className="card" style={{ height: 270 }}>
			<div className="card-content">
				<div className="content blog-card">
					<div className="before-heading author-time-info is-flex">
						<Link
							to={`/search?query=${
								BlogReader.categories(blogInfo) || "Unknown"
							}&2`}>
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
						</Link>
						{blogInfo.createdAt && (
							<span className="subtitle " style={{ marginLeft: 20 }}>
								<span className="is-size-7">
									<ReactTimeAgo date={blogInfo.createdAt} locale="en-US" />
								</span>
							</span>
						)}
					</div>

					<span className="card-title ">
						<Link
							to={`/blog/${BlogReader.id(blogInfo)}`}
							className="has-text-black titleBlogCard">
							<span>{BlogReader.title(blogInfo)}</span>
						</Link>
					</span>

					<hr />
					<span className="blog-description">
						{blogInfo.subTitle
							? blogInfo.subTitle
							: ReactHtmlParser(BlogReader.blogContent(blogInfo))}
					</span>
					<span className="blog-author-card has-text-weight-bold is-uppercase is-flex mt-4 ">
						<Link to={`author/${blogInfo.authorId}`} className="has-text-dark">
							<span className="author-name">
								<FaUser />
								{authorInfo && authorInfo.fullName.slice(0, 15)}
							</span>
						</Link>
						<div className="card-like-and-save">
							<LikeSaveShare
								blogInfo={blogInfo}
								fixed={true}
								triggered={triggered}
								setTriggered={setTriggered}
							/>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
}

export default BlogCard;
