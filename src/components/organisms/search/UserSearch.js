import React from "react";
import _map from "lodash/map";
import UserSearch from "../../molecules/userSearch";

function UsersSearch({ usersList }) {
	return (
		<div style={{ margin: 5 }}>
			{_map(usersList, user => (
				<UserSearch userInfo={user} />
			))}
		</div>
	);
}

export default UsersSearch;
