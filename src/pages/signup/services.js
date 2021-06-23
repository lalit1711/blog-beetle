import Auth from "@aws-amplify/auth";
import axios from "axios";

export const _signUp = (
	{ email, password, name },
	setLoader,
	setErrorMessage
) => {
	return Auth.signUp({
		username: email.trim(),
		password: password,
		attributes: {
			email: email, // optional
			name: name // optional - E.164 number convention
			// other custom attributes
		}
	}).catch(err => {
		setErrorMessage(err.message);
		setLoader(false);
	});
};

export const _createUser = (user, id, setLoader) => {
	console.log(id);
	const postData = {
		id: id,
		emailAddress: user.email,
		imgSrc: "",
		userName: user.email,
		fullName: user.name,
		socialLinks: ""
	};
	return axios({
		method: "POST",
		url: "/users",
		data: postData
	}).catch(err => {
		setLoader(false);
	});
};
