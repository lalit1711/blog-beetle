import React, { useEffect, useState } from "react";
import Footer from "../../molecules/footer";
import Navbar from "../../molecules/navbar";
import Amplify from "aws-amplify";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
Amplify.configure({
	Auth: {
		mandatorySignId: true,
		userPoolId: "ap-southeast-1_0mytnpFdg",
		userPoolWebClientId: "66l90vafmod7domca0ma0mjr5q"
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
