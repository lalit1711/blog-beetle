import React from "react";

function Footer() {
	return (
		<footer className="footer">
			<div className="content is-flex-desktop">
				<strong className=" has-text-white">
					Copyright &#169; Born to Blog. 2021
				</strong>

				<strong className=" social ">
					<div className="columns is-multiline is-marginless">
						<div className="column is-3">
							<span>TWITTER</span>
						</div>
						<div className="column is-3">
							<span>FACEBOOK</span>
						</div>
						<div className="column is-3">
							<span>LINKEDIN</span>
						</div>
						<div className="column is-3">
							<span>INSTAGRAM</span>
						</div>
					</div>
				</strong>
			</div>
		</footer>
	);
}

export default Footer;
