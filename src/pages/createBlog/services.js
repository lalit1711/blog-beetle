import axios from "../../config/axios";

export const _createBlog = function (data) {
	return axios({
		url: `/blogs`,
		data,
		method: "POST"
	});
};
