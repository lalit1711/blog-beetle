import axios from "../../config/axios";

export const _createAndEditBlog = function (data, method = "POST", url) {
	return axios({
		url: url,
		data,
		method: method
	});
};
