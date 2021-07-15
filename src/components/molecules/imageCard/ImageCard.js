import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "./constants/ImageCategory.default";
import { FaClock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import BlogReader from "../../../readers/blog";
import categories from "../../../constants/categories";
import { _getAuthorInfo } from "../../../services/services";
import ReactTimeAgo from "react-time-ago";

function ImageCard({ blogInfo, height = 270, date = true }) {
	const [authorInfo, setAuthorInfo] = useState(null);

	useEffect(() => {
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data);
		});
	}, [blogInfo.authorId]);

	return (
		<div className="card image-card-border" style={{ height: height }}>
			<div className="card-content is-paddingless" style={{ height: "100%" }}>
				<div className="image-card has-background-dark"></div>
				<div className="content image-card-content">
					<span
						className="tag "
						style={{
							background:
								BlogReader.categories(blogInfo) &&
								categories[BlogReader.categories(blogInfo).trim()] &&
								categories[BlogReader.categories(blogInfo).trim()].color
						}}>
						{BlogReader.categories(blogInfo)}
					</span>
					<Link to={`/blog/${BlogReader.id(blogInfo)}`}>
						<span className="card-title has-text-white">
							{BlogReader.title(blogInfo)}
						</span>
					</Link>

					<hr />
					<Link
						to={`/author/${BlogReader.authorId(blogInfo)}`}
						className="author-time-info is-flex">
						<span className="has-text-white is-size-6">
							<FaUser /> {authorInfo && authorInfo.fullName}
						</span>
						{date && blogInfo.createdAt && (
							<span
								className="subtitle has-text-white "
								style={{ marginLeft: 20 }}>
								<FaClock />{" "}
								<span className="is-size-6">
									<ReactTimeAgo date={blogInfo.createdAt} locale="en-US" />
								</span>
							</span>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
}

ImageCard.propTypes = {
	blogInfo: PropTypes.object
};

ImageCard.defaultProps = {
	blogInfo: DEFAULT_CATEGORY_INFO
};

export default ImageCard;
