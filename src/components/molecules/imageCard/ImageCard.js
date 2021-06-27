import React from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "./constants/ImageCategory.default";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function ImageCard({ blogInfo, height = 250, authorInfo }) {
	const { title, cover, authorName, id, authorId, categories } = blogInfo;
	return (
		<div class="card " style={{ height: height }}>
			<div class="card-content is-paddingless" style={{ height: "100%" }}>
				<div
					className="image-card"
					style={{
						backgroundImage: `url(${cover})`
					}}></div>
				<div class="content image-card-content">
					<span className="tag is-dark">{categories}</span>
					<Link to={`/blog/${id}`}>
						<span className="card-title has-text-white">{title}</span>
					</Link>

					<hr />
					<Link to={`/author/${authorId}`}>
						<span className="subtitle has-text-white has-text-weight-bold">
							<FaUser /> {authorInfo && authorInfo.fullName}
						</span>
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
