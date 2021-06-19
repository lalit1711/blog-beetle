import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/button/Button";
import { Link } from "react-router-dom";

function Navbar(props) {
	const { isLoggedIn } = props;
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link to="/" className="navbar-item">
					<img
						src="https://image-dock-uploads-be.s3.ap-south-1.amazonaws.com/image.2021-06-16T14%3A53%3A35.151Z"
						width="60"
						height="80"
						alt="blog-beetle"
					/>
				</Link>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					{/* <div className="navbar-item">
						<img src="/icons/akar-icons_search.svg" />
					</div> */}
					{!isLoggedIn ? (
						<div className="navbar-item">
							<Button>Sign in</Button>
						</div>
					) : (
						<Fragment>
							<div className="navbar-item has-text-weight-semibold">
								<Link to="/create-blog">Write a Blog</Link>
							</div>

							<div className="navbar-item">
								<figure className="image is-48x48">
									<img
										className="is-rounded"
										src="https://bulma.io/images/placeholders/128x128.png"
										alt="user-profile"
									/>
								</figure>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</nav>
	);
}

Navbar.prototypes = {
	isLoggedIn: PropTypes.bool
};

Navbar.defaultProps = {
	isLoggedIn: true
};

export default Navbar;
