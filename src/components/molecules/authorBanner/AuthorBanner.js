import React, { useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMG_SRC } from "../../../constants/user";
import UserReader from "../../../readers/user";
// import editIcon from "../../../../public/icons/edit.svg"

function AuthorBanner({ userInfo }) {
	const { facebook, github, twitter, linkedIn } = JSON.parse(
		userInfo.socialLinks
	);

	return (
		<section className="hero is-small is-light author-banner">
			<div className="hero-body">
				<div className="hero-cover-image"></div>
				<div
					className="user-image is-rounded scaleAnimate"
					style={{
						backgroundImage: `url(${UserReader.imgSrc(userInfo) || IMG_SRC})`,
						height: "6em",
						width: "6em"
					}}></div>

				<p style={{ marginTop: "12px" }} className="title">
					<Link to={`/author/${userInfo.id}`}>
						{UserReader.fullName(userInfo) || userInfo.name}
					</Link>
				</p>
				<hr />
				<p className="subtitle has-text-centered">{userInfo.bio}</p>
				<div className="social-section" style={{ margin: "20px 0px" }}>
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
	);
}

export default AuthorBanner;

// ---------------------------------------------------------------------------------
