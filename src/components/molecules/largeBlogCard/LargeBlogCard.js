import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import BlogReader from "../../../readers/blog";
import { _getAuthorInfo } from "../../../services/services";
import categories from "../../../constants/categories";

function LargeBlogCard({ blogInfo }) {
	const [authorInfo, setAuthorInfo] = useState(null);

	useEffect(() => {
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data);
		});
	}, [blogInfo.authorId]);
	return (
		<div className="large-blog-card columns">
			<div
				className="column is-5 is-hidden-mobile"
				style={{
					background: `url(${
						BlogReader.coverImgSrc(blogInfo) ||
						"https://cdn.pixabay.com/photo/2021/05/01/09/59/city-6220689_960_720.jpg"
					})`,
					marginRight: 40
				}}>
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
			</div>
			<div
				className="blog-info column is-7 is-paddingless "
				style={{ margin: 10 }}>
				<Link to={`/blog/${BlogReader.id(blogInfo)}`}>
					<div className="title has-text-black">
						{BlogReader.title(blogInfo)}
					</div>
				</Link>
				<hr />
				<div className="blog-description">
					{ReactHtmlParser(BlogReader.blogContent(blogInfo))}
				</div>
				<Link to={`/author/${blogInfo.authorId}`}>
					<div className="author-info is-uppercase">
						<FaUser /> {authorInfo && authorInfo.fullName}
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
