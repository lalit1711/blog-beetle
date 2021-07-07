import React from "react";
import _map from "lodash/map";
import UserSearch from "../../molecules/userSearch";
import { Fragment } from "react";

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
				<div className="no-item-message">Nothing to display</div>
			)}
		</div>
	);
}

export default UsersSearch;
