import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import BlogReader from "../../../readers/blog";
import { _getAuthorInfo } from "../../../services/services";
import categories from "../../../constants/categories";
import LikeSaveShare from "../../organisms/Blog/LikeSaveShare";
import { checkImageExists, getImageFromBlog } from "../../../helpers/util";

function LargeBlogCard({ blogInfo, triggered, setTriggered }) {
	const [authorInfo, setAuthorInfo] = useState(null);
	const [backgroundUrl, setBackgroundUrl] = useState(false);

	useEffect(() => {
		checkImageExists(getImageFromBlog(blogInfo?.blogContent), setBackgroundUrl);
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data.user);
		});
	}, [blogInfo.authorId]);

	return (
		<div className="large-blog-card columns">
			{backgroundUrl && (
				<div className="image-large-blog-card column is-5 is-paddingless">
					<div
						className="image-large-blog"
						style={{
							background: `url(${backgroundUrl})`,
							backgroundSize: "cover",
							height: "100%",
							padding: 0
						}}></div>
				</div>
			)}
			<div className="blog-info column is-paddingless " style={{ margin: 10 }}>
				<Link to={`/blog/${BlogReader.id(blogInfo)}`} className="">
					<div className="title has-text-black">
						{BlogReader.title(blogInfo)}
						<Link
							to={`/search?query=${
								BlogReader.categories(blogInfo) || "Unknown"
							}&2`}>
							<span
								className="tag is-dark ml-4"
								style={{
									background:
										BlogReader.categories(blogInfo) &&
										categories[BlogReader.categories(blogInfo).trim()] &&
										categories[BlogReader.categories(blogInfo).trim()].color
								}}>
								{BlogReader.categories(blogInfo)}
							</span>
						</Link>
					</div>
				</Link>

				<hr />
				<div className="blog-description mb-5">
					{ReactHtmlParser(BlogReader.blogContent(blogInfo))}
				</div>

				<div className="author-info is-uppercase is-flex blog-author-card">
					<Link to={`/author/${blogInfo.authorId}`}>
						<span className="has-text-dark">
							<FaUser /> {authorInfo && authorInfo.fullName}
						</span>
					</Link>
					<span>
						<LikeSaveShare
							blogInfo={blogInfo}
							fixed={true}
							triggered={triggered}
							setTriggered={setTriggered}
						/>
					</span>
				</div>
			</div>
		</div>
	);
}
LargeBlogCard.propTypes = {
	blogInfo: PropTypes.object
};

LargeBlogCard.defaultProps = {
	blogInfo: DEFAULT_CATEGORY_INFO
};

export default LargeBlogCard;
