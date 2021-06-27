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

export const _createUser = (user, id, setLoader) => {
	const postData = {
		id: id,
		emailAddress: user.email,
		imgSrc: "",
		userName: user.email,
		fullName: user.name,
		socialLinks: "",
		password: "****"
	};
	return axios({
		method: "POST",
		url: "/users",
		data: postData
	}).catch(err => {
		setLoader(false);
	});
};
