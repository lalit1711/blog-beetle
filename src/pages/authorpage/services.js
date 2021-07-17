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
	const url =
		"/blogs?filter=" +
		encodeURIComponent(JSON.stringify(requestBlogDataForUser(id)));

	return axios({
		url,
		method: "GET"
	});
}

export function _getSavedBlogs(id) {
	return new Promise((resolve, reject) => {
		axios
			.get(
				"/saved-blogs?filter=" +
					encodeURIComponent(JSON.stringify(requestDataSavedBlog(id)))
			)
			.then(res => {
				const requestData = getSavedBlogRequestData(
					res.data.map(item => item.blogId)
				);
				axios
					.get(
						"/blogs?filter=" + encodeURIComponent(JSON.stringify(requestData))
					)
					.then(res => {
						resolve(res.data);
					})
					.catch(err => reject([]));
			});
	});
}

export function _getDraftBlogs(id) {
	const url =
		"/blogs?filter=" +
		encodeURIComponent(JSON.stringify(requestDataForDrafts(id)));
	return axios({
		url,
		method: "GET"
	});
}
