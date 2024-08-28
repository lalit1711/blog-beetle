import axios from "axios";
import {
	getSavedBlogRequestData,
	requestBlogDataForUser,
	requestDataForDrafts,
	requestDataSavedBlog
} from "../../helpers/util";

export function _getAuthorInfo(id) {
	return axios({
		url: `/users/${id}`,
		method: "GET"
	});
}

export function _getAuthorsPublishedBlogs(id) {
	const url = `/blogs?authorId=${id}`;
	return axios({
		url,
		method: "GET"
	});
}

export function _getSavedBlogs(id) {
	return new Promise((resolve, reject) => {
		axios.get("/blogs/savedBlogs").then(res => {
			resolve(res.data.data);
		});
	});
}

export function _getDraftBlogs() {
	const url = `/blogs/draftBlogs`;
	return axios({
		url,
		method: "GET"
	});
}
