import React from "react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function AuthorBanner({ userInfo }) {
	const { name, userId, image, bio, cover } = userInfo;
	return (
		<section className="hero is-medium is-info author-banner">
			<div className="hero-body" style={{ backgroundImage: `url(${cover})` }}>
				<div className="hero-cover-image"></div>

				<div
					className="user-image is-rounded"
					style={{ backgroundImage: `url(${image})` }}></div>

				<p className="title">
					<Link to={`/author/${userId}`}>{name}</Link>
				</p>
				<hr />
				<p className="subtitle">{bio}</p>
				<div className="social-section" style={{ margin: "20px 0px" }}>
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
	);
}

export default AuthorBanner;
