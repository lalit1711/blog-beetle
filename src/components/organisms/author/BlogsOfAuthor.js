import axios from "axios";
import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";

function BlogsOfAuthor() {
	const [blogList, setBlogsList] = useState([]);

	const requestData = {
		"offset": 0,
		"limit": 100,
		"skip": 0,

		"where": {
			"authorId": "7c2313cb-4f15-49d1-a2e1-9f6c5f72862d",
			 "published":1
		},
		"fields": {
			"id": true,
			"title": true,
			"coverImgSrc": true,
			"subTitle": true,
			"authorId": true,
			"blogContent": true,
			"published": true,
			"categories": true,
			"createdAt": true,
			"updatedAt": true
		}
	}

	useEffect(() => {
		axios
			.get("/blogs?filter=" + encodeURIComponent(JSON.stringify(requestData)))
			.then(res => setBlogsList(res.data));
	}, []);
	return (
		<div className="authors-blogs">
			{_map(blogList, blog => {
				return (
					<div className="blog">
						<LargeBlogCard blogInfo={blog} />
						<hr />
					</div>
				);
			})}
		</div>
	);
}

const requestData = {
	offset: 0,
	limit: 100,
	skip: 0,

	where: {
		authorId: "7c2313cb-4f15-49d1-a2e1-9f6c5f72862d"
	},
	fields: {
		id: true,
		title: true,
		coverImgSrc: true,
		subTitle: true,
		authorId: true,
		blogContent: true,
		published: true,
		categories: true,
		createdAt: true,
		updatedAt: true
	}
};

export default BlogsOfAuthor;
