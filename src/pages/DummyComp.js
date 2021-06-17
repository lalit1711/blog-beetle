import React from "react";
import CategoryTile from "../components/atoms/categoryTile";
import ImageCard from "../components/molecules/imageCard";
import BlogCard from "../components/molecules/blogCard";
import LargeBlogCard from "../components/molecules/largeBlogCard";
import BriefCard from "../components/molecules/breifCard";
import Tabs from "../components/atoms/tabs/Tabs";
import Footer from "../components/molecules/footer";
import Navbar from "../components/molecules/navbar";
import UserSearch from "../components/molecules/userSearch";
import AuthorBanner from "../components/molecules/authorBanner";
import ConfirmationBox from "../components/molecules/confirmationBox";
import AuthorInfo from "../components/molecules/authorInfo";

function DummyComp() {
	const dummyData = { id: "xyz", name: "Blog name" };
	return (
		<div>
			<Navbar />
			<AuthorBanner userInfo={userInfo} />
			<div className="container section">
				<div className="title">Suggested Blogs</div>
				<div className="columns">
					<div className="column is-three-quarters">
						<LargeBlogCard blogInfo={tempData} />
					</div>
					<hr className="hr-v" style={{ height: 300 }} />
					<div className="column">
						<h2 className="brief-blog-heading">Latest Blog(s)</h2>
						<BriefCard blogInfo={tempData} />
					</div>
				</div>
			</div>

			<div className="title">Suggested Blogs</div>
			<div className="columns is-10 is-flex">
				<div className="columns">
					<div className="column is-3">
						<BlogCard />
					</div>
					<div className="column is-3">
						<BlogCard />
					</div>
					<div className="column is-3">
						<BlogCard />
					</div>
				</div>
			</div>
			<br />

			<div className="container">
				<div className="columns">
					<div className="column is-6">
						<ImageCard blogInfo={tempData} />
					</div>
				</div>
				<br />

				<AuthorInfo userInfo={userInfo} />
				<CategoryTile selected={true} />
				<div
					className="container column is-three-quarters"
					style={{ padding: "10px 30px" }}>
					<Tabs />
					<div
						className="container column is-four-fifths"
						style={{ padding: "10px 0px" }}>
						<LargeBlogCard blogInfo={tempData} />
						<hr />
						<UserSearch userInfo={userInfo} />
						<UserSearch userInfo={userInfo} />
					</div>
				</div>
			</div>
			<ConfirmationBox />
			<Footer />
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

const userInfo = {
	image:
		"https://images.unsplash.com/photo-1622793348115-4e85dc2ca4eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNhcHRhaW4lMjBhbWVyaWNhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	userId: "007",
	name: "Steave Rogers",
	bio: "Recipient of the Super-Soldier and one of the world’s mightiest heroes and the leader of the Avengers.",
	cover:
		"https://images.unsplash.com/photo-1527843812948-a8c2ddd2fb68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
};
export default DummyComp;
