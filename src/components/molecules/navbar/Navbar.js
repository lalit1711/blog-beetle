import React, { Fragment, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../../atoms/button/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import { BsBookmarkFill } from "react-icons/bs";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import Auth from "@aws-amplify/auth";
import blogBeetleLogo from ".././../../assets/beetle.jpg";
import { IMG_SRC } from "../../../constants/user";
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa";

function Navbar(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [showBurger, setShowBurger] = useState(false);
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
				<Link to="/" className="navbar-item navbar-end">
					<img
						src={blogBeetleLogo}
						alt="blog-beetle"
						style={{
							height: "80px",
							width: "45px",
							borderRadius: "50%",
							objectFit: "cover"
						}}
					/>
				</Link>

				<span
					role="button"
					className="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
					onClick={() => setShowBurger(!showBurger)}>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</span>
			</div>

			<div className={`navbar-menu navbar-end ${showBurger && "is-active"}`}>
				<div className="navbar-end">
					<span className="navbar-item">
						{location.pathname.indexOf("search") === -1 && (
							<Fragment>
								{showSearch ? (
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
													autoFocus
													onBlur={() => setShowSearch(false)}
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
								) : (
									<img
										className="is-32x32 "
										src="/icons/akar-icons_search.svg"
										alt="search-icon"
										onClick={() => setShowSearch(true)}
									/>
								)}
							</Fragment>
						)}
					</span>
					{!isLoggedIn ? (
						<div className="navbar-item">
							<Link to="/login">
								<Button>Sign in</Button>
							</Link>
						</div>
					) : (
						<Fragment>
							<div className="navbar-item">
								<Link to="/create-blog">
									<Button>Write a blog</Button>
								</Link>
							</div>
							<div className="navbar-item mr-6">
								<div className="navbar-item has-dropdown is-hoverable">
									<span className="navbar-link is-hidden-touch">
										<figure className="image is-42x42   ">
											<img
												className="is-rounded"
												src={(user && user.imgSrc) || IMG_SRC}
												alt="user-profile"
											/>
										</figure>
									</span>

									<div className="navbar-dropdown is-right">
										<span className="navbar-item ">
											<Link
												to={`/author/${user && user.id}`}
												className="has-text-dark ">
												<span className="hover-color">
													<FaUserAlt className="mr-2" /> Profile
												</span>
											</Link>
										</span>
										<span className="navbar-item">
											<Link
												to={`/author/${user && user.id}?savedBlogs`}
												className="has-text-dark ">
												<span className="hover-color">
													<BsBookmarkFill className="mr-2" />
													Saved Blogs
												</span>
											</Link>
										</span>

										<span
											className="navbar-item has-text-dark hover-color"
											onClick={signOut}>
											<FaSignOutAlt className="mr-2" /> Log Out
										</span>
									</div>
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
