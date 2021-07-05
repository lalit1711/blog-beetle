import React, { Fragment, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/button/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import Auth from "@aws-amplify/auth";
import blogBeetleLogo from ".././../../assets/beetle.png";
import { IMG_SRC } from "../../../constants/user";

function Navbar(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [key, setKey] = useState("");
	const { user, userLoggedIn } = useContext(AuthenticatorContext);
	const history = useHistory();
	const location = useLocation();

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

	function searchKey() {
		if (!key.trim()) return;
		history.push(`/search?query=${key}`);
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
					{location.pathname.indexOf("search") === -1 && (
						<div className="navbar-item">
							<div className="field">
								<p className={`control is-large ${"has-icons-left"} `}>
									<input
										className="input is-small"
										type="text"
										placeholder="Search"
										value={key}
										onChange={e => {
											setKey(e.target.value);
										}}
										onKeyDown={e => {
											if (e.keyCode === 13) searchKey();
										}}
									/>

									<span className="icon is-small is-left">
										<i>
											<img
												src="/icons/akar-icons_search.svg"
												alt="search-icon"
											/>
										</i>
									</span>
								</p>
							</div>
						</div>
					)}
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

							<div
								className={`navbar-item has-dropdown ${
									isDropDownOpen && "is-active"
								}`}
								onClick={openDropDown}>
								<figure className="image is-42x42 mt-3 mr-5 ">
									<img
										className="is-rounded"
										src={(user && user.imgSrc) || IMG_SRC}
										alt="user-profile"
									/>
								</figure>

								<div class="navbar-dropdown is-right">
									<span class="navbar-item">
										<Link to={`/author/${user && user.id}`}>Profile</Link>
									</span>
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
