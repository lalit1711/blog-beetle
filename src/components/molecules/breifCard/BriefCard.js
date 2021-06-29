import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";
import BlogReader from "../../../readers/blog";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { _getAuthorInfo } from "../../../services/services";

function BriefCard({ blogInfo }) {
	const [authorInfo, setAuthorInfo] = useState(null);

	useEffect(() => {
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data);
		});
	}, [blogInfo.authorId]);

	return (
		<div className="brief-card ">
			<div
				className="blog-image"
				style={{
					background: `url(${DEFAULT_CATEGORY_INFO.coverImageSrc})`
				}}></div>
			<div className="blog-info">
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
