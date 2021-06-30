import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IMG_SRC } from "../../../constants/user";

function UserSearch({ userInfo }) {
	const { fullName, id, imgSrc, bio } = userInfo;
	return (
		<div className="user-search is-flex">
			<div
				className="user-image"
				style={{
					backgroundImage: `url(${imgSrc || IMG_SRC})`
				}}></div>
			<div className="user-info">
				<Link to={`/author/${id}`}>
					<div className="user-name has-text-black">{fullName}</div>
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
