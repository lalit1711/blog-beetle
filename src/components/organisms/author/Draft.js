import axios from "axios";
import React, { useEffect, useState } from "react";
import _map from "lodash/map";
import LargeBlogCard from "../../molecules/largeBlogCard";
import { requestDataForDrafts } from "../../../helpers/util";
import { useParams } from "react-router";

function Draft() {
	const [blogList, setBlogsList] = useState([]);
	const params = useParams();
	const userId = params.id;

	useEffect(() => {
		axios
			.get(
				"/blogs?filter=" +
					encodeURIComponent(JSON.stringify(requestDataForDrafts(userId)))
			)
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

export default Draft;
