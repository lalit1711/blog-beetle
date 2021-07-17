import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useLocation } from "react-router";
import Tabs from "../../components/atoms/tabs/Tabs";
import SuggestedBlogs from "../../components/organisms/Blog/SuggestedBlogs";
import BlogSearch from "../../components/organisms/search/BlogSearch";
import UsersSearch from "../../components/organisms/search/UserSearch";
import { deBouncingFunction } from "../../helpers/helpers";
import { requestDataLike, requestDataUserLike } from "../../helpers/util";
import { _getFilterBlogs } from "../landingPage/services";

function Search() {
	const [activeTab, setActiveTab] = useState(0);
	const [key, setKey] = useState("");
	const [searchedUser, setSearchedUser] = useState([]);
	const [searchedBlogs, setSearchedBlogs] = useState([]);
	const [loader, setLoader] = useState(false);
	// const { user } = useContext(AuthenticatorContext);
	const location = useLocation();

	useEffect(() => {
		const queries = location.search.split("=")[1];
		const [key, tab] = queries.split("&");
		if (key) {
			setKey(key);
			setActiveTab(parseInt(tab || 0));
			searchKey(key, tab || 0);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	useEffect(() => {
		delayFunction(key, activeTab);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, key]);

	const searchKey = (key, active) => {
		if (!key.trim()) return null;
		setLoader(true);
		if (active === 0) {
			_getFilterBlogs(
				"/blogs?filter=" +
					encodeURIComponent(JSON.stringify(requestDataLike(key)))
			).then(res => {
				setSearchedBlogs(res.data);
				setLoader(false);
			});
		} else if (active === 1) {
			_getFilterBlogs(
				"/users?filter=" +
					encodeURIComponent(JSON.stringify(requestDataUserLike(key)))
			).then(res => {
				setSearchedUser(res.data);
				setLoader(false);
			});
		} else {
			setLoader(false);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const delayFunction = useCallback(deBouncingFunction(searchKey, 500), []);

	const tabOptions = [
		{ title: "Blogs", index: 0 },
		{ title: "Users", index: 1 },
		{ title: "Categories", index: 2 }
	];
	return (
		<div className="search-container container">
			<div className="columns">
				<div className="column is-8 is-offset-2">
					<div className="field">
						<p
							className={`control is-large ${
								loader ? "is-loading" : "has-icons-right"
							} `}>
							<input
								className="input is-large "
								type="text"
								placeholder="Search"
								value={key}
								onChange={e => {
									setKey(e.target.value);
								}}
								onKeyDown={e => {
									if (e.keyCode === 13) searchKey(key);
								}}
								autoFocus
							/>
							{!loader && (
								<span className="icon is-small is-right">
									<i>
										<img src="/icons/akar-icons_search.svg" alt="search-icon" />
									</i>
								</span>
							)}
						</p>
					</div>
					<div className="columns">
						<div
							className="column  "
							style={{
								marginTop: "2%"
							}}>
							<div className="tab-section">
								<Tabs
									tabOptions={tabOptions}
									active={activeTab}
									setActiveTab={setActiveTab}
								/>
							</div>
							<div className="main-section">
								{getActiveTabComponent(
									activeTab,
									searchedUser,
									searchedBlogs,
									key
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const getActiveTabComponent = (active, searchedUser, searchedBlogs, key) => {
	switch (active) {
		case 0:
			return <BlogSearch blogsList={searchedBlogs} />;

		case 1:
			return <UsersSearch usersList={searchedUser} />;
		case 2:
			return (
				<div className="mt-5 search-section-suggested">
					<SuggestedBlogs
						categories={[key]}
						landingPage={false}
						title={false}
						fullWidth={true}
					/>
				</div>
			);
		default:
			return null;
	}
};

export default Search;
