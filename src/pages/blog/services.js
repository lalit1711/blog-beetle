import axios from "../../config/axios";

export const _getBlogById = function (id) {
	const url = `/blogs/${id}`;
	return axios({
		method: "GET",
		url
	});
};
