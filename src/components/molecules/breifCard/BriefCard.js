import React from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";

function BriefCard({ blogInfo }) {
	const { title, cover, authorName, url, authorId, categoryName } = blogInfo;

	return (
		<div className="brief-card ">
			<div className="blog-image" style={{ background: `url(${cover})` }}></div>
			<div className="blog-description">
				<span className="brief-blog-title">{title}</span>
				<div className="author-info is-uppercase">Lalit</div>
			</div>
		</div>
	);
}
BriefCard.propTypes = {
	blogInfo: PropTypes.object
};

BriefCard.defaultProps = {
	BriefCard: DEFAULT_CATEGORY_INFO
};

export default BriefCard;
