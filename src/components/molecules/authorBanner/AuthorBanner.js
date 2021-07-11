import React, { useState } from "react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMG_SRC } from "../../../constants/user";
import UserReader from "../../../readers/user";
// import editIcon from "../../../../public/icons/edit.svg"

function AuthorBanner({ userInfo }) {

	return (
		<section className="hero is-small is-light author-banner">
			<div className="hero-body">
				<div className="hero-cover-image"></div>
				<div
					className="user-image is-rounded"
					style={{
						backgroundImage: `url(${UserReader.imgSrc(userInfo) || IMG_SRC})`, display: 'flex', justifyContent: 'center', alignItems: 'center'
					}}>

				</div>

				<p className="title">
					<Link to={`/author/${userInfo.id}`}>
						{UserReader.fullName(userInfo) || userInfo.name}
					</Link>
				</p>
				<hr />
				<p className="subtitle has-text-centered">{userInfo.bio}</p>
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

// ---------------------------------------------------------------------------------







