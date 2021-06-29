import axios from "../../config/axios";

export const _getAllBlogs = function () {
	return axios({
		url: `/blogs`,
		method: "GET"
	});
};

export const _getFilterBlogs = function (url) {
	return axios({
		url: url,
		method: "GET"
	});
};
