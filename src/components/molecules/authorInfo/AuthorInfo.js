import React from "react";
import PropTypes from "prop-types";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMG_SRC } from "../../../constants/user";

function AuthorInfo({ userInfo }) {
	const { fullName, id, imgSrc, bio, socialLinks } = userInfo;
	return (
		<div>
			<section className="hero author-info-hero">
				<div className="hero-body">
					<div className="user-main is-flex">
						<div
							className="user-image"
							style={{
								backgroundImage: `url(${imgSrc || IMG_SRC})`
							}}></div>
						<Link to={`/author/${id}`}>
							{" "}
							<p className="title has-text-color-black">{fullName}</p>
						</Link>
					</div>
					<hr />
					<p className="">{bio}</p>
					{socialLinks && (
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
					)}
				</div>
			</section>
		</div>
	);
}

AuthorInfo.propTypes = {
	userInfo: PropTypes.object
};

export default AuthorInfo;
