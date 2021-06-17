import React from "react";

function AuthorBanner({ userInfo }) {
	const { name, userId, image, bio, cover } = userInfo;
	return (
		<section className="hero is-medium is-info author-banner">
			<div className="hero-body" style={{ backgroundImage: `url(${cover})` }}>
				<div
					className="user-image is-rounded"
					style={{ backgroundImage: `url(${image})` }}></div>

				<p className="title">{name}</p>
				<hr />
				<p className="subtitle">
					Inventor Tony Stark applies his genius for high-tech solutions to
					problems as Iron Man, the armored Avenger.
				</p>
			</div>
		</section>
	);
}

export default AuthorBanner;
