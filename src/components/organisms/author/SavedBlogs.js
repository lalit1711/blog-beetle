import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import axios from "axios";
import { reset } from "aphrodite";

function SavedBlogs() {
	const [blogList, setBlogsList] = useState([]);

	const requestDataSavedBlog={
		"offset": 0,
		"limit": 100,
		"skip": 0,
		"where": {
		  "userId": "7c2313cb-4f15-49d1-a2e1-9f6c5f72862d",
		  "active": 1
		},
		"fields": {
		  "id": true,
		  "userId": true,
		  "blogId": true,
		  "active": true,
		  "createdAt": true,
		  "updatedAt": true
		}
	  }


	
	useEffect(() => {
		axios.get("/saved-blogs?filter=" + encodeURIComponent(JSON.stringify(requestDataSavedBlog))).then(res => {
			console.log("----savedBlogs----",res.data)
			const requestData=getSavedBlogRequestData(res.data.map(item=>item.blogId))
			axios.get("/blogs?filter=" + encodeURIComponent(JSON.stringify(requestData))).then(res =>setBlogsList(res.data))
		});
	}, []);

	return <div className="authors-blogs">
		{_map(blogList, blog => {
			return (
				<div className="blog">
					<LargeBlogCard blogInfo={blog} />
					<hr />
				</div>
			);
		})}
	</div>
}




function getSavedBlogRequestData (blogIdArray){
	return {
		"offset": 0,
		"limit": 100,
		"skip": 0,
		
		"where": {
		  "id": {"inq":blogIdArray}
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
}

export default SavedBlogs;
