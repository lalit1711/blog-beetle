import React from "react";
import BlogCard from "../../molecules/blogCard";
import ImageCard from "../../molecules/imageCard";

function TrendingBlogs({ blogsList }) {
	return (
		<div className="columns trending-blogs-container ">
			<div className="column is-1"></div>

			{blogsList.length ? (
				<div className="column is-10">
					{/* <div className="title">Trending blogs</div> */}
					<div className="columns">
						<div className="column is-8 ">
							<ImageCard blogInfo={blogsList[0]} />
						</div>
						<div className="column">
							{blogsList.length ? <BlogCard blogInfo={blogsList[1]} /> : null}
						</div>
					</div>

					<div className="columns">
						{blogsList[2] && (
							<div className="column">
								<BlogCard blogInfo={blogsList[2]} />
							</div>
						)}
						{blogsList[3] && (
							<div className="column">
								<BlogCard blogInfo={blogsList[3]} />
							</div>
						)}
						{blogsList[4] && (
							<div className="column">
								<ImageCard blogInfo={blogsList[4]} />
							</div>
						)}
					</div>
				</div>
			) : null}
			<div className="column is-1"></div>
		</div>
	);
}

export default TrendingBlogs;
