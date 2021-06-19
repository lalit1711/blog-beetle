import React from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function LargeBlogCard({ blogInfo }) {
	const { title, cover, authorName, id, authorId, categoryName, description } =
		blogInfo;
	return (
		<div className="large-blog-card">
			<div className="blog-image" style={{ background: `url(${cover})` }}>
				<span className="tag is-link">{categoryName}</span>
			</div>
			<div className="blog-info">
				<Link to={`/blog/${id}`}>
					<div className="title has-text-black">{title}</div>
				</Link>
				<hr />
				<div className="blog-description">{description}</div>
				<Link to={`/author/${authorId}`}>
					<div className="author-info is-uppercase">
						<FaUser /> {" " + authorName}
					</div>
				</Link>
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
