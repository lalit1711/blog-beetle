import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "./constants/ImageCategory.default";
import { FaClock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import BlogReader from "../../../readers/blog";
import categories from "../../../constants/categories";
import { _getAuthorInfo } from "../../../services/services";

function ImageCard({ blogInfo, height = 250, date = false }) {
	const [authorInfo, setAuthorInfo] = useState(null);

	useEffect(() => {
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data);
		});
	}, [blogInfo.authorId]);

	return (
		<div class="card " style={{ height: height }}>
			<div class="card-content is-paddingless" style={{ height: "100%" }}>
				<div
					className="image-card"
					style={{
						backgroundImage: `url(${DEFAULT_CATEGORY_INFO.coverImageSrc})`
					}}></div>
				<div class="content image-card-content">
					<span
						className="tag is-dark"
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
					<Link to={`/author/${BlogReader.authorId(blogInfo)}`}>
						<span className="subtitle has-text-white has-text-weight-bold">
							<FaUser /> {authorInfo && authorInfo.fullName}
						</span>
						{date && (
							<span
								className="subtitle has-text-white "
								style={{ marginLeft: 20 }}>
								<FaClock /> {new Date(blogInfo.createdAt).toDateString()}
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
