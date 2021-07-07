import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IMG_SRC } from "../../../constants/user";
import UserReader from "../../../readers/user";

function UserSearch({ userInfo }) {
	return (
		<div className="user-search is-flex">
			<div
				className="user-image"
				style={{
					backgroundImage: `url(${UserReader.imgSrc(userInfo) || IMG_SRC})`
				}}></div>
			<div className="user-info">
				<Link to={`/author/${UserReader.id(userInfo)}`}>
					<div className="user-name has-text-black">
						{UserReader.fullName(userInfo)}
					</div>
				</Link>
				<div className="user-bio">{UserReader.bio(userInfo)}</div>
			</div>
		</div>
	);
}

UserSearch.propTypes = {
	userInfo: PropTypes.object
};

export default UserSearch;
