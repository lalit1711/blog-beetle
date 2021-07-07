import React, { useEffect, useState } from "react";
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
import dateformat from "dateformat";
import categories from "../../constants/categories";

function Blog(props) {
	const [content, setContent] = useState("");
	const [authorInfo, setAuthorInfo] = useState(null);
	const [triggered, setTriggered] = useState(false);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		const blogId = props.match.params.id;
		setLoader(true);
		_getBlogById(blogId)
			.then(res => {
				setContent({ ...tempData, ...res.data });
				_getUserInfo(res.data.authorId).then(res => {
					setAuthorInfo(res.data);
					setLoader(false);
				});
			})
			.catch(err => props.history.push("/"));
	}, [props.history, props.match.params.id]);

	if (loader) return <BlogLoader />;
	return (
		<div>
			<div className="container">
				<div className="columns create-blog">
					<div className="column is-2">
						{" "}
						{/* <LikeSaveShare
							blogInfo={content}
							fixed={true}
							setTriggered={setTriggered}
							triggered
						/> */}
					</div>
					<div className="column is-8">
						<div className="hero is-small blog-content mt-5">
							<div className="hero-body has-text-centered">
								<p className="title">{content.title}</p>
								{content.subTitle && (
									<p className="subtitle mt-3">{content.subTitle}</p>
								)}
								<div className="author-time-info is-flex">
									<span
										className="tag is-dark"
										style={{
											background:
												BlogReader.categories(content) &&
												categories[BlogReader.categories(content).trim()] &&
												categories[BlogReader.categories(content).trim()].color
										}}>
										{BlogReader.categories(content)}
									</span>
									<Link to={`/author/${BlogReader.authorId(content)}`}>
										<span className=" is-size-6">
											<FaUser /> {authorInfo && authorInfo.fullName}
										</span>
									</Link>
									<span className="subtitle " style={{ marginLeft: 20 }}>
										<FaClock style={{ height: 16 }} />{" "}
										<span className="is-size-6">
											{dateformat(content.createdAt, "mediumDate")}
										</span>
									</span>
								</div>
							</div>
						</div>
						<BlogContent content={content.blogContent} />
						<LikeSaveShare
							blogInfo={content}
							setTriggered={setTriggered}
							triggered
						/>
					</div>
				</div>
				<hr />
				<div className="columns">
					<div className="column is-1"></div>
					<div className="column is-10">
						{authorInfo && <AuthorInfo userInfo={authorInfo} />}
						<Comments
							blogId={content.id}
							authorId={authorInfo && authorInfo.id}
						/>
					</div>
					<div className="column is-1"></div>
				</div>
				<div className="columns mt-5" style={{ textAlign: "center" }}>
					<div className="column is-1"></div>
					<div className="column is-10">
						<SuggestedBlogs
							categories={[content.categories]}
							landingPage={false}
						/>
					</div>
					<div className="column is-1"></div>
				</div>
			</div>
		</div>
	);
}

const tempData = {
	cover:
		"https://cdn.pixabay.com/photo/2021/05/01/09/59/city-6220689_960_720.jpg",
	title: "How to hack NASA with HTML",
	authorName: "Ranchor Das",
	url: "/howtohack",
	authorId: "007",
	categoryName: "Food",
	description: `Nostrud fugiat cupidatat consequat anim aliquip officia. Nostrud non eu nisi tempor ad. Culpa do velit minim dolore cupidatat tempor deserunt in officia. Adipisicing excepteur fugiat voluptate duis deserunt commodo nostrud ad do et culpa ad adipisicing fugiat. Consequat proident voluptate fugiat irure ullamco ipsum cillum proident aliqua incididunt non nisi consequat.`
};

export default Blog;
