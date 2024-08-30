import Auth from "@aws-amplify/auth";
import axios from "axios";

export const _signUp = ({ email, password, name }) => {
	return Auth.signUp({
		username: email.trim(),
		password: password,
		attributes: {
			email: email, // optional
			name: name // optional - E.164 number convention
			// other custom attributes
		}
	});
};

export const _createUser = user => {
	const postData = {
		email: user.email,
		imgSrc: "",
		fullName: user.fullName,
		socialLinks: "",
		password: user.password,
		passwordConfirm: user.passwordConfirm
	};
	return axios({
		method: "POST",
		url: "/users/signup",
		data: postData
	});
};
