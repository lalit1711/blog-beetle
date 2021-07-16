import React from "react";
import _map from "lodash/map";
import UserSearch from "../../molecules/userSearch";
import { Fragment } from "react";
import ReactLottie from "./../../../animation/LottieReact"

function UsersSearch({ usersList }) {
	return (
		<div style={{ margin: 5 }}>
			{usersList.length > 0 ? (
				<Fragment>
					{_map(usersList, user => (
						<UserSearch userInfo={user} />
					))}
				</Fragment>
			) : (
				<div>
					<ReactLottie keyIndex={3} />
					<h1 className="noResults">No results found</h1>
					<h4 className="noResultsSub">We could not find any blogs based on your search
					</h4>
				</div>
			)}
		</div>
	);
}

export default UsersSearch;
