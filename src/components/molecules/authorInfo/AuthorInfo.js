import React from "react";
import PropTypes from "prop-types";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";

function AuthorInfo({ userInfo }) {
	const { name, userId, image, bio } = userInfo;
	return (
		<div>
			<section className="hero author-info-hero">
				<div className="hero-body">
					<div className="user-main is-flex">
						<div
							className="user-image"
							style={{ backgroundImage: `url(${image})` }}></div>
						<p className="title">{name}</p>
					</div>
					<hr />
					<p className="">{bio}</p>
					<div className="social-section">
						<span>
							<FaFacebook />
						</span>
						<span>
							<FaTwitter />
						</span>
						<span>
							<FaGithub />
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}

AuthorInfo.propTypes = {
	userInfo: PropTypes.object
};

export default AuthorInfo;
