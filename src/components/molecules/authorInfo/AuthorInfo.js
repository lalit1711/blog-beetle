import React from "react";
import PropTypes from "prop-types";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMG_SRC } from "../../../constants/user";

const data = JSON.stringify({
	facebook: "",
	github: "",
	twitter: "",
	linkedIn: ""
});
function AuthorInfo({ userInfo }) {
	const { fullName, id, imgSrc, bio } = userInfo;
	const {
		facebook = null,
		github = null,
		twitter = null,
		linkedIn = null
	} = JSON.parse(userInfo.socialLinks || data);
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

					<div className="social-section mt-5">
						{facebook && (
							<a href={facebook} target="_blank" rel="noreferrer">
								<span>
									<FaFacebook />
								</span>
							</a>
						)}
						{twitter && (
							<a href={twitter} target="_blank" rel="noreferrer">
								<span>
									<FaTwitter />
								</span>
							</a>
						)}
						{github && (
							<a href={github} target="_blank" rel="noreferrer">
								<span>
									<FaGithub />
								</span>
							</a>
						)}
						{linkedIn && (
							<a href={linkedIn} target="_blank" rel="noreferrer">
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
