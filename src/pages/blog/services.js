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

export const _likeBlog = function (blogId) {
	return axios({
		method: "PATCH",
		url: `/blogs/like/${blogId}`
	});
};

//-----------------------get Current Context Likes---------------------
export const _getCurrentUserContextLikes = function (data) {
	// alert("called")
	return axios.get(
		"/blog-likes?filter=" + encodeURIComponent(JSON.stringify(data))
	);
};

export const _getLikeCount = function (id) {
	const query = { blogId: id, active: 1 };
	const url =
		"/blog-likes/count?where=" + encodeURIComponent(JSON.stringify(query));
	return axios.get(url);
};

export const _reLike = function (data) {
	let query = data;
	// alert(JSON.stringify(query))
	let bodyData = { active: 1 };
	return axios.patch(
		"/blog-likes?where=" + encodeURIComponent(JSON.stringify(query)),
		bodyData
	);
};

export const _revokeLike = function (data) {
	let query = data;
	let bodyData = { active: 0 };
	return axios.patch(
		"/blog-likes?where=" + encodeURIComponent(JSON.stringify(query)),
		bodyData
	);
};

export const _removeSavedBlog = function (id) {
	const url = `/saved-blogs/${id}`;
	return axios({
		method: "DELETE",
		url
	});
};
