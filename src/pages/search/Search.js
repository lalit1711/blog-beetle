import React, { useEffect, useState } from "react";
import Tabs from "../../components/atoms/tabs/Tabs";
import BlogSearch from "../../components/organisms/search/BlogSearch";
import UsersSearch from "../../components/organisms/search/UserSearch";
import { requestDataLike, requestDataUserLike } from "../../helpers/util";
import { _getFilterBlogs } from "../landingPage/services";

function Search() {
	const [activeTab, setActiveTab] = useState(0);
	const [key, setKey] = useState("");
	const [searchedUser, setSearchedUser] = useState([]);
	const [searchedBlogs, setSearchedBlogs] = useState([]);
	const [loader, setLoader] = useState(false);
	// const { user } = useContext(AuthenticatorContext);
	// const params = useParams();

	useEffect(() => {
		searchKey();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	const searchKey = () => {
		if (!key.trim()) return null;
		setLoader(true);
		if (activeTab === 0) {
			_getFilterBlogs(
				"/blogs?filter=" +
					encodeURIComponent(JSON.stringify(requestDataLike(key)))
			).then(res => {
				setSearchedBlogs(res.data);
				setLoader(false);
			});
		} else {
			_getFilterBlogs(
				"/users?filter=" +
					encodeURIComponent(JSON.stringify(requestDataUserLike(key)))
			).then(res => {
				setSearchedUser(res.data);
				setLoader(false);
			});
		}
	};

	const tabOptions = [
		{ title: "Blogs", index: 0 },
		{ title: "Users", index: 1 }
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
									if (e.keyCode === 13) searchKey();
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
								{getActiveTabComponent(activeTab, searchedUser, searchedBlogs)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const getActiveTabComponent = (active, searchedUser, searchedBlogs) => {
	switch (active) {
		case 0:
			return <BlogSearch blogsList={searchedBlogs} />;

		case 1:
			return <UsersSearch usersList={searchedUser} />;
		default:
			return null;
	}
};

export default Search;
