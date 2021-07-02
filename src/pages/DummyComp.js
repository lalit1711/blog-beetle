import React from "react";
import Footer from "../components/molecules/footer";
import Navbar from "../components/molecules/navbar";
import AuthorBanner from "../components/molecules/authorBanner";
import ConfirmationBox from "../components/molecules/confirmationBox";

function DummyComp() {
	return (
		<div>
			<Navbar />
			<AuthorBanner userInfo={userInfo} />

			<ConfirmationBox />
			<Footer />
		</div>
	);
}

const userInfo = {
	image:
		"https://images.unsplash.com/photo-1622793348115-4e85dc2ca4eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNhcHRhaW4lMjBhbWVyaWNhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	userId: "007",
	name: "Steave Rogers",
	bio: "Recipient of the Super-Soldier and one of the world’s mightiest heroes and the leader of the Avengers.",
	cover:
		"https://images.unsplash.com/photo-1527843812948-a8c2ddd2fb68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
};
export default DummyComp;
