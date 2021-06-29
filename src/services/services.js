import axios from "axios";

export const _getAuthorInfo = id => {
	return axios({
		method: "GET",
		url: `/users/${id}`
	});
};
