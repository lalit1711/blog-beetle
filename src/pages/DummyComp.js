import React from "react";
import CategoryReader from "../readers/Category";
import CategoryTile from "../components/atoms/categoryTile";
import ImageCard from "../components/molecules/imageCard";
import BlogCard from "../components/molecules/blogCard";
import LargeBlogCard from "../components/molecules/largeBlogCard";
import BriefCard from "../components/molecules/breifCard";
import Tabs from "../components/atoms/tabs/Tabs";
import Footer from "../components/atoms/footer";

function DummyComp() {
	const dummyData = { id: "xyz", name: "Blog name" };
	return (
		<div>
			<CategoryTile selected={true} />
			<div className="container">
				<div className="columns">
					<div className="column is-6">
						<ImageCard blogInfo={tempData} />
					</div>
				</div>
				<br />
				<div className="title">Suggested Blogs</div>
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
				<br />
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
				<div
					className="container section"
					style={{ border: "1px solid", padding: "10px 30px" }}>
					<Tabs />
				</div>
			</div>
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
export default DummyComp;
