import React, { useContext, useEffect, useState } from "react";
import AuthorInfo from "../../components/molecules/authorInfo";
import Comments from "../../components/molecules/comments";
import BlogContent from "../../components/organisms/Blog/BlogContent";
import BlogReader from "../../readers/blog";
import LikeSaveShare from "../../components/organisms/Blog/LikeSaveShare";
import SuggestedBlogs from "../../components/organisms/Blog/SuggestedBlogs";
import BlogLoader from "../../components/organisms/loader/BlogLoader";
import { _getUserInfo } from "../login/services";
import { _getBlogById } from "./services";
import { Link } from "react-router-dom";
import { FaClock, FaUser } from "react-icons/fa";
import categories from "../../constants/categories";
import ReactTimeAgo from "react-time-ago";
import { AuthenticatorContext } from "../../context/authenticatorContext";

function Blog(props) {
	const [content, setContent] = useState("");
	const [authorInfo, setAuthorInfo] = useState(null);
	const [loader, setLoader] = useState(false);
	const { user } = useContext(AuthenticatorContext);

	useEffect(() => {
		const blogId = props.match.params.id;
		setLoader(true);
		_getBlogById(blogId)
			.then(res => {
				setContent(res.data.data.blog);

				// if (user.id !== res.data.authorId) props.history.push("/");
				_getUserInfo(res.data.data.blog.authorId).then(res => {
					setAuthorInfo(res.data.user);
					setLoader(false);
				});
			})
			.catch(err => props.history.push("/"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.history, props.match.params.id]);

	if (loader) return <BlogLoader />;
	return (
		<div>
			<div className="container">
				<div className="columns create-blog">
					<div className="column is-2"></div>
					<div className="column is-8">
						<div className="hero is-small blog-content mt-5">
							<div className="hero-body has-text-centered">
								<p className="title blog-title ">{content.title}</p>
								{content.subTitle && (
									<p className="subtitle mt-3">{content.subTitle}</p>
								)}

								<div className="author-time-info is-flex">
									<Link
										to={`/search?query=${
											BlogReader.categories(content) || "Unknown"
										}&2`}>
										<span
											className="tag is-dark"
											style={{
												background:
													BlogReader.categories(content) &&
													categories[BlogReader.categories(content).trim()] &&
													categories[BlogReader.categories(content).trim()]
														.color
											}}>
											{BlogReader.categories(content)}
										</span>
									</Link>
									<Link to={`/author/${BlogReader.authorId(content)}`}>
										<span className=" is-size-6 has-text-dark">
											<FaUser /> {authorInfo && authorInfo.fullName}
										</span>
									</Link>
									<span className="subtitle ">
										<FaClock style={{ height: 16 }} />{" "}
										<span className="is-size-6">
											{content && content.createdAt && content.published ? (
												<ReactTimeAgo date={content.createdAt} locale="en-US" />
											) : (
												"Not Published"
											)}
										</span>
									</span>
								</div>
							</div>
						</div>

						<BlogContent content={content.blogContent} />
						<LikeSaveShare blogInfo={content} triggered />
					</div>
				</div>
				<hr />
				<div className="columns">
					<div className="column is-1"></div>
					<div className="column is-10">
						{authorInfo && <AuthorInfo userInfo={authorInfo} />}
						<Comments
							blogId={content._id}
							authorId={authorInfo && authorInfo._id}
						/>
					</div>
					<div className="column is-1"></div>
				</div>

				<div className="columns mt-5" style={{ textAlign: "center" }}>
					<div className="column is-1"></div>
					<div className="column is-10">
						<SuggestedBlogs
							categories={content.categories}
							landingPage={false}
							blogId={content._id}
						/>
					</div>
					<div className="column is-1"></div>
				</div>
			</div>
		</div>
	);
}

export default Blog;
