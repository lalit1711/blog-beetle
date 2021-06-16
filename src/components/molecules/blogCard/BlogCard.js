import React from "react";

function BlogCard() {
	return (
		<div className="card" style={{ height: 250 }}>
			<div className="card-content">
				<div className="content blog-card">
					<span className="tag is-info">Frontend</span>
					<span className="card-title">How to hack NASA with HTML</span>
					<span className="blog-description">
						It’s rather impossible to know all the APIs by heart. This is where
						cheat sheets come in! Here are It’s rather impossible to know all
						the APIs by heart.
					</span>
					<hr />
					<span className="blog-author-card has-text-weight-bold is-uppercase">
						Lalit
					</span>
				</div>
			</div>
		</div>
	);
}

export default BlogCard;
