import React, { useContext, useState } from "react";
import Tabs from "../../components/atoms/tabs/Tabs";
import AuthorBanner from "../../components/molecules/authorBanner";
import AuthorProfile from "../../components/organisms/author/AuthorProfile";
import BlogsOfAuthor from "../../components/organisms/author/BlogsOfAuthor";
import Draft from "../../components/organisms/author/Draft";
import SavedBlogs from "../../components/organisms/author/SavedBlogs";
import { AuthenticatorContext } from "../../context/authenticatorContext";

function AuthorPage() {
	const [activeTab, setActiveTab] = useState(0);
	const { user } = useContext(AuthenticatorContext);
	const tabOptions = [
		{ title: "Blogs", index: 0 },
		{ title: "Profile", index: 1 },
		{ title: "Saved Blogs", index: 2 },
		{ title: "Drafts", index: 3 }
	];
	return (
		<div className="author-page">
			<AuthorBanner userInfo={userInfo} />
			<div className="main-container ">
				<div className="columns">
					<div className="column is-2"></div>
					<div className="column is-8">
						<div className="tab-section">
							<Tabs
								tabOptions={tabOptions}
								active={activeTab}
								setActiveTab={setActiveTab}
							/>
						</div>
						<div className="main-section">
							{getActiveTabComponent(activeTab)}
						</div>
					</div>
					<div className="column is-2"></div>
				</div>
			</div>
		</div>
	);
}

const getActiveTabComponent = active => {
	switch (active) {
		case 0:
			return <BlogsOfAuthor />;

		case 1:
			return <AuthorProfile />;

		case 2:
			return <SavedBlogs />;

		case 3:
			return <Draft />;
		default:
			return null;
	}
};

const userInfo = {
	image:
		"https://images.unsplash.com/photo-1622793348115-4e85dc2ca4eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNhcHRhaW4lMjBhbWVyaWNhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
	userId: "007",
	name: "Steave Rogers",
	bio: "Recipient of the Super-Soldier and one of the world’s mightiest heroes and the leader of the Avengers.",
	cover:
		"https://images.unsplash.com/photo-1527843812948-a8c2ddd2fb68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
};

export default AuthorPage;
