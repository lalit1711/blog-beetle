import React from "react";
import PropTypes from "prop-types";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

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
						<Link to={`/author/${userId}`}>
							{" "}
							<p className="title has-text-color-black">{name}</p>
						</Link>
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
