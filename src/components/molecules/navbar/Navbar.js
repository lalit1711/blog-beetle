import React, { Fragment, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/button/Button";
import { Link, useHistory } from "react-router-dom";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import Auth from "@aws-amplify/auth";
import blogBeetleLogo from ".././../../assets/beetle.png";
import { IMG_SRC } from "../../../constants/user";

function Navbar(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const { user, userLoggedIn } = useContext(AuthenticatorContext);
	const history = useHistory();

	useEffect(() => {
		const user = localStorage.getItem("user");

		if (user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [user]);

	function openDropDown() {
		setIsDropDownOpen(!isDropDownOpen);
	}

	async function signOut() {
		openDropDown();
		try {
			await Auth.signOut();
			localStorage.removeItem("user");
			userLoggedIn();
			history.push(`/`);
		} catch (error) {
			console.log("error signing out: ", error);
		}
	}

	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<Link to="/" className="navbar-item">
					<img
						src={blogBeetleLogo}
						alt="blog-beetle"
						style={{ height: "80px", width: "60px" }}
					/>
				</Link>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						<Link to="/search">
							<img src="/icons/akar-icons_search.svg" alt="search-img" />
						</Link>
					</div>
					{!isLoggedIn ? (
						<div className="navbar-item">
							<Link to="/login">
								<Button>Sign in</Button>
							</Link>
						</div>
					) : (
						<Fragment>
							<div className="navbar-item has-text-weight-semibold">
								<Link to="/create-blog">Write a Blog</Link>
							</div>

							<div className="navbar-item">
								<Link to={`/author/${user && user.id}`}>
									<figure className="image is-42x42">
										<img
											className="is-rounded"
											src={user.imgSrc || IMG_SRC}
											alt="user-profile"
										/>
									</figure>
								</Link>
							</div>
							<div
								className={`navbar-item has-dropdown ${
									isDropDownOpen && "is-active"
								}`}
								onClick={openDropDown}>
								<span className="navbar-link"></span>

								<div class="navbar-dropdown is-right">
									<span class="navbar-item" onClick={signOut}>
										Log Out
									</span>
								</div>
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
