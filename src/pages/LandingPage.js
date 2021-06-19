import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/molecules/blogCard";

function LandingPage() {
	const [blogsList, setBlogsList] = useState([]);
	useEffect(() => {
		axios.get(`/blogs`).then(res => {
			setBlogsList(res.data);
		});
	}, []);
	return (
		<div className="landing-page">
			<div className="container">
				<div className="columns">
					<div className="column is-1"></div>
					<div className="column is-10">
						<div className="title">Blogs List</div>
						<div className="columns is-multiline">
							{blogsList.map(blog => (
								<div className="column is-4">
									<BlogCard blogInfo={blog} />
								</div>
							))}
						</div>
					</div>
					<div className="column is-1"></div>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
