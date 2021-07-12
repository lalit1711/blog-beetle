import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DEFAULT_CATEGORY_INFO from "../imageCard/constants/ImageCategory.default";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import BlogReader from "../../../readers/blog";
import { _getAuthorInfo } from "../../../services/services";
import categories from "../../../constants/categories";
import LikeSaveShare from "../../organisms/Blog/LikeSaveShare";

function LargeBlogCard({ blogInfo }) {
	const [authorInfo, setAuthorInfo] = useState(null);

	useEffect(() => {
		_getAuthorInfo(blogInfo.authorId).then(res => {
			setAuthorInfo(res.data);
		});
	}, [blogInfo.authorId]);
	return (
		<div className="large-blog-card columns">
			<div className="blog-info column  is-paddingless " style={{ margin: 10 }}>
				<Link to={`/blog/${BlogReader.id(blogInfo)}`} className="">
					<div className="title has-text-black">
						{BlogReader.title(blogInfo)}
						<span
							className="tag is-dark ml-4"
							style={{
								background:
									BlogReader.categories(blogInfo) &&
									categories[BlogReader.categories(blogInfo).trim()] &&
									categories[BlogReader.categories(blogInfo).trim()].color
							}}>
							{BlogReader.categories(blogInfo)}
						</span>
					</div>
				</Link>

				<hr />
				<div className="blog-description mb-5">
					{ReactHtmlParser(BlogReader.blogContent(blogInfo))}
				</div>
				<Link to={`/author/${blogInfo.authorId}`}>
					<div className="author-info is-uppercase is-flex blog-author-card">
						<span>
							<FaUser /> {authorInfo && authorInfo.fullName}
						</span>
						<span>
							<LikeSaveShare blogInfo={blogInfo} fixed={true} onlyView={true} />
						</span>
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
