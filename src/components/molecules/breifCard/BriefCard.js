import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";
import BlogReader from "../../../readers/blog";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { _getAuthorInfo } from "../../../services/services";
import { checkImageExists, getImageFromBlog } from "../../../helpers/util";

function BriefCard({ blogInfo }) {
	const [authorInfo, setAuthorInfo] = useState(null);
	const [backgroundUrl, setBackgroundUrl] = useState(null);

	useEffect(() => {
		checkImageExists(getImageFromBlog(blogInfo.blogContent), setBackgroundUrl);
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data.user);
		});
	}, [blogInfo.authorId]);

	return (
		<div className="brief-card columns">
			{backgroundUrl && (
				<div
					style={{
						background: `url(${backgroundUrl})`,
						backgroundSize: "cover",
						width: 100,
						height: 100,
						marginTop: 12
					}}
					className="column is-4"></div>
			)}
			<div className="blog-info column">
				<div className="blog-description">
					<Link to={`/blog/${BlogReader.id(blogInfo)}`}>
						<span className="brief-blog-title has-tex-color-dark">
							{BlogReader.title(blogInfo)}
						</span>
					</Link>
				</div>
				<Link to={`/author/${BlogReader.authorId(blogInfo)}`}>
					<div className="author-info is-uppercase ">
						<FaUser />
						{authorInfo && authorInfo.fullName}
					</div>
				</Link>
			</div>
		</div>
	);
}
BriefCard.propTypes = {
	blogInfo: PropTypes.object
};

BriefCard.defaultProps = {
	blogInfo: DEFAULT_CATEGORY_INFO
};

export default BriefCard;
