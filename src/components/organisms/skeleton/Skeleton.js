import React, { useEffect, useState } from "react";
import Footer from "../../molecules/footer";
import Navbar from "../../molecules/navbar";
import Amplify from "aws-amplify";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
Amplify.configure({
	Auth: {
		mandatorySignId: true,
		userPoolId: "ap-south-1_UtALYj397",
		userPoolWebClientId: "5b59a9ca4p3o56jm9ukns44pp"
	},
	Storage: {
		AWSS3: {
			bucket: "blogbeetle", //REQUIRED -  Amazon S3 bucket name
			region: "ap-south-1" //OPTIONAL -  Amazon service region
		}
	}
});

function Skeleton({ children, ...rest }) {
	const [user, setUser] = useState(1);

	useEffect(() => {
		userLoggedIn();
	}, []);

	const userLoggedIn = () => {
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		} else {
			setUser(null);
		}
	};
	return (
		<AuthenticatorContext.Provider value={{ user, userLoggedIn }}>
			<Navbar />
			<div style={{ minHeight: "37em" }}>{children}</div>
			<Footer />
		</AuthenticatorContext.Provider>
	);
}

export default Skeleton;
