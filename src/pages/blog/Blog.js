import React, { useEffect, useState } from "react";
import AuthorInfo from "../../components/molecules/authorInfo";
import ImageCard from "../../components/molecules/imageCard";
import BlogContent from "../../components/organisms/Blog/BlogContent";
import LikeSaveShare from "../../components/organisms/Blog/LikeSaveShare";
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
	}, []);

	return (
		<div>
			<div className="hero is-large blog-content">
				<ImageCard blogInfo={content} height={450} authorInfo={authorInfo} />
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
					</div>
					<div className="column is-1"></div>
				</div>
			</div>
		</div>
	);
}

const userInfo = {
	image:
		"https://images.unsplash.com/photo-1622793348115-4e85dc2ca4eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNhcHRhaW4lMjBhbWVyaWNhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	userId: "007",
	name: "Steave Rogers",
	bio: "Recipient of the Super-Soldier and one of the world’s mightiest heroes and the leader of the Avengers.",
	cover:
		"https://images.unsplash.com/photo-1527843812948-a8c2ddd2fb68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
};

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
