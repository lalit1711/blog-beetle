import React from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function BriefCard({ blogInfo }) {
	const { title, cover, authorName, id, authorId } = blogInfo;

	return (
		<div className="brief-card ">
			<div className="blog-image" style={{ background: `url(${cover})` }}></div>
			<div className="blog-description">
				<Link to={`/blog/${id}`}>
					<span className="brief-blog-title has-tex-color-dark">{title}</span>
				</Link>
				<Link to={`/author/${authorId}`}>
					<div className="author-info is-uppercase ">
						<FaUser /> {" " + authorName}
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
