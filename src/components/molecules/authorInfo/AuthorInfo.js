import React from "react";
import PropTypes from "prop-types";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMG_SRC } from "../../../constants/user";

function AuthorInfo({ userInfo }) {
	const { fullName, id, imgSrc, bio } = userInfo;
	const { facebook, github, twitter, linkedIn } = JSON.parse(
		userInfo.socialLinks
	);
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

					<div className="social-section">
						{facebook && (
							<a href={facebook} target="_blank">
								<span>
									<FaFacebook />
								</span>
							</a>
						)}
						{twitter && (
							<a href={twitter} target="_blank">
								<span>
									<FaTwitter />
								</span>
							</a>
						)}
						{github && (
							<a href={github} target="_blank">
								<span>
									<FaGithub />
								</span>
							</a>
						)}
						{linkedIn && (
							<a href={linkedIn} target="_blank">
								<span>
									<FaLinkedin />
								</span>
							</a>
						)}
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
