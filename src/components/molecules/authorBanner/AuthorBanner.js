import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMG_SRC, SOCIAL_LINKS } from "../../../constants/user";
import UserReader from "../../../readers/user";
// import editIcon from "../../../../public/icons/edit.svg"

function AuthorBanner({ userInfo }) {
	const {
		facebook = null,
		github = null,
		twitter = null,
		linkedIn = null
	} = JSON.parse(userInfo.socialLinks || SOCIAL_LINKS);

	return (
		<section className="hero is-small is-primary author-banner">
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
				<div
					className="social-section has-icon-white"
					style={{ margin: "20px 0px" }}>
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
	);
}

export default AuthorBanner;

// ---------------------------------------------------------------------------------
