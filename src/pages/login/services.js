import Auth from "@aws-amplify/auth";
import axios from "axios";

export function _signIn(username, password, setLoader, setErrorMessage) {
	return Auth.signIn(username, password).catch(err => {
		setLoader(false);
		setErrorMessage(err.message);
	});
}

export function _getUserInfo(id) {
	return axios({
		method: "Get",
		url: `/users/${id}`
	});
}

export function _logIn(payload) {
	return axios({
		method: "POST",
		url: `/users/login`,
		data: payload
	});
}
