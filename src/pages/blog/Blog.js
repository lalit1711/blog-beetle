import React, { useEffect, useState } from "react";
import AuthorInfo from "../../components/molecules/authorInfo";
import Comments from "../../components/molecules/comments";
import ImageCard from "../../components/molecules/imageCard";
import BlogContent from "../../components/organisms/Blog/BlogContent";
import LikeSaveShare from "../../components/organisms/Blog/LikeSaveShare";
import SuggestedBlogs from "../../components/organisms/Blog/SuggestedBlogs";
import { _getUserInfo } from "../login/services";
import { _getBlogById } from "./services";

function Blog(props) {
	const [content, setContent] = useState("");
	const [authorInfo, setAuthorInfo] = useState(null);

	useEffect(() => {
		const blogId = props.match.params.id;
		_getBlogById(blogId)
			.then(res => {
				setContent({ ...tempData, ...res.data });
				_getUserInfo(res.data.authorId).then(res => setAuthorInfo(res.data));
			})
			.catch(err => props.history.push("/"));
	}, [props.history, props.match.params.id]);

	return (
		<div>
			<div className="hero is-large blog-content">
				<ImageCard blogInfo={content} height={450} date={true} />
			</div>
			<div className="container">
				<div className="columns create-blog">
					<div className="column is-2"></div>
					<div className="column is-8">
						<BlogContent content={content.blogContent} />
						<LikeSaveShare blogInfo={content} />
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
