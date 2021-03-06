import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useLocation, useParams } from "react-router";
import Tabs from "../../components/atoms/tabs/Tabs";
import AuthorBanner from "../../components/molecules/authorBanner";
import AuthorProfile from "../../components/organisms/author/AuthorProfile";
import BlogsOfAuthor from "../../components/organisms/author/BlogsOfAuthor";
import Draft from "../../components/organisms/author/Draft";
import SavedBlogs from "../../components/organisms/author/SavedBlogs";
import { SOCIAL_LINKS } from "../../constants/user";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import { _getAuthorInfo } from "./services";

function AuthorPage() {
	const [activeTab, setActiveTab] = useState(0);
	const { user, updateLocalStorage } = useContext(AuthenticatorContext);
	const [authorInfo, setAuthorInfo] = useState(null);
	const [updateData, setUpdateData] = useState(false);
	const location = useLocation();
	const params = useParams();

	const tabOptions = [
		{ title: "Blogs", index: 0 },
		{ title: "Profile", index: 1 },
		{ title: "Saved Blogs", index: 2 },
		{ title: "Drafts", index: 3 }
	];

	useEffect(() => {
		const shouldShowSavedBlogs = location.search === "?savedBlogs";
		if (shouldShowSavedBlogs) setActiveTab(2);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		_getAuthorInfo(params.id).then(res => {
			if (res.data.socialLinks === "") res.data.socialLinks = SOCIAL_LINKS;
			setAuthorInfo(res.data);
			if (user && params.id === user.id) {
				updateLocalStorage(res.data);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.id, updateData]);

	if (authorInfo)
		return (
			<div className="author-page">
				<AuthorBanner userInfo={authorInfo} />
				<div className="main-container ">
					<div className="columns">
						<div className="column is-2"></div>
						<div className="column is-8">
							<div className="tab-section">
								{!user ||
									(user && params.id === user.id && (
										<Tabs
											tabOptions={tabOptions}
											active={activeTab}
											setActiveTab={setActiveTab}
										/>
									))}
							</div>
							<div className="main-section">
								{getActiveTabComponent(
									activeTab,
									updateData,
									setUpdateData,
									authorInfo
								)}
							</div>
						</div>
						<div className="column is-2"></div>
					</div>
				</div>
			</div>
		);
	else {
		return <Skeleton height={400} />;
	}
}

const getActiveTabComponent = (
	active,
	updateData,
	setUpdateData,
	authorInfo
) => {
	switch (active) {
		case 0:
			return <BlogsOfAuthor />;

		case 1:
			return (
				<AuthorProfile
					updateData={updateData}
					setUpdateData={setUpdateData}
					authorInfo={authorInfo}
				/>
			);

		case 2:
			return <SavedBlogs />;

		case 3:
			return <Draft />;
		default:
			return null;
	}
};

export default AuthorPage;
