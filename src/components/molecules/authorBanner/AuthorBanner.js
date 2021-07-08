import React from "react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

import UserReader from "../../../readers/user";

function AuthorBanner({ userInfo }) {
	return (
		<section className="hero is-small is-dark author-banner">
			<div className="hero-body">
				<div className="hero-cover-image"></div>

				<div
					className="user-image is-rounded"
					style={{
						backgroundImage: `url(${UserReader.imgSrc(userInfo)})`
					}}></div>

				<p className="title">
					<Link to={`/author/${userInfo.id}`}>
						{UserReader.fullName(userInfo) || userInfo.name}
					</Link>
				</p>
				<hr />
				<p className="subtitle">{userInfo.bio}</p>
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
