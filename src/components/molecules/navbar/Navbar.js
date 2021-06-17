import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/button/Button";
import { FaSearch } from "react-icons/fa";

function Navbar(props) {
	const { isLoggedIn } = props;
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="#">
					<img
						src="https://image-dock-uploads-be.s3.ap-south-1.amazonaws.com/image.2021-06-16T14%3A53%3A35.151Z"
						width="60"
						height="80"
					/>
				</a>

				<a
					role="button"
					className="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						<img src="/icons/akar-icons_search.svg" />
					</div>
					{!isLoggedIn ? (
						<div className="navbar-item">
							<Button>Sign in</Button>
						</div>
					) : (
						<Fragment>
							<div className="navbar-item has-text-weight-semibold">
								Write a Blog
							</div>
							<div className="navbar-item">
								<figure className="image is-48x48">
									<img
										className="is-rounded"
										src="https://bulma.io/images/placeholders/128x128.png"
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
	isLoggedIn: false
};

export default Navbar;
