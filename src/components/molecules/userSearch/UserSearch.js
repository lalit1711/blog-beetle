import React from "react";
import PropTypes from "prop-types";

function UserSearch({ userInfo }) {
	const { name, userId, image, bio } = userInfo;
	return (
		<div className="user-search is-flex">
			<div
				className="user-image"
				style={{
					backgroundImage: `url(${image})`
				}}></div>
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="user-bio">{bio}</div>
			</div>
		</div>
	);
}

UserSearch.propTypes = {
	userInfo: PropTypes.object
};

export default UserSearch;
