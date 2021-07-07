import axios from "../../config/axios";

export const _getBlogById = function (id) {
	const url = `/blogs/${id}`;
	return axios({
		method: "GET",
		url
	});
};

export const _deleteBlog = function (id) {
	const url = `/blogs/${id}`;
	return axios({
		method: "DELETE",
		url
	});
};

export const _likeBlog = function (data) {
	return axios({
		method: "POST",
		url: `/blog-likes`,
		data: data
	});
};

export const _getLikeCount = function (id) {
	const query = { where: { blogId: id } };
	const url = "/blog-likes/count?filter" + JSON.stringify(query);
	return axios.get(url, query);
};

export const _revokeLike = function (id) {
	const url = `/blog-likes/${id}`;
	return axios({
		method: "DELETE",
		url
	});
};

export const _removeSavedBlog = function (id) {
	const url = `/saved-blogs/${id}`;
	return axios({
		method: "DELETE",
		url
	});
};
