import React from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";

function LargeBlogCard({ blogInfo }) {
	const { title, cover, authorName, url, authorId, categoryName, description } =
		blogInfo;
	return (
		<div className="large-blog-card">
			<div className="blog-image" style={{ background: `url(${cover})` }}>
				<span className="tag is-link">{categoryName}</span>
			</div>
			<div className="blog-info">
				<div className="title">{title}</div>
				<hr />
				<div className="blog-description">{description}</div>
				<div className="author-info is-uppercase">{authorName}</div>
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
