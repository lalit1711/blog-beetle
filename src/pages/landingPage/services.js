import axios from "../../config/axios";

export const _getAllBlogs = function () {
	return axios({
		url: `/blogs`,
		method: "GET"
	});
};
