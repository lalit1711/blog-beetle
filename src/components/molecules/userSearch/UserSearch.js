import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserSearch({ userInfo }) {
	const { name, authorId, image, bio } = userInfo;
	return (
		<div className="user-search is-flex">
			<div
				className="user-image"
				style={{
					backgroundImage: `url(${image})`
				}}></div>
			<div className="user-info">
				<Link to={`/author/${authorId}`}>
					<div className="user-name has-text-black">{name}</div>
				</Link>
				<div className="user-bio">{bio}</div>
			</div>
		</div>
	);
}

UserSearch.propTypes = {
	userInfo: PropTypes.object
};

export default UserSearch;
