import React from "react";
import ReactHtmlParser from "react-html-parser";

function BlogContent({ content }) {
	return (
		<div className="container columns " style={{ justifyContent: "center" }}>
			<div className=" column is-four-fifths read-blog">
				<div className="blog-content-container ql-editor">
					{ReactHtmlParser(content)}
				</div>
			</div>
		</div>
	);
}

export default BlogContent;
