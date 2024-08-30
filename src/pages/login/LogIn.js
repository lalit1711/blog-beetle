import React, { useContext, useEffect, useState } from "react";
import { zoomIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import Button from "../../components/atoms/button";
import { Link } from "react-router-dom";
import { _getUserInfo, _logIn, _signIn } from "./services";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import beetleLogo from "./../../assets/beetle.jpg";
import { AiOutlineClose } from "react-icons/ai";

function LogIn(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loader, setLoader] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { user, userLoggedIn } = useContext(AuthenticatorContext);

	const styles = StyleSheet.create({
		bounce: {
			animationName: zoomIn,
			animationDuration: "0.5s"
		}
	});

	useEffect(() => {
		if (user) goBack();
	}, [user]);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoader(true);
		// setErrorMessage("")

		_logIn({ email: username, password })
			.then(user => {
				console.log({ user });
				setLoader(false);
				localStorage.setItem("user", JSON.stringify(user.data.data.user));
				localStorage.setItem("token", user.data.token);
				userLoggedIn();
				window.location.reload();
			})
			.catch(err => {
				setLoader(false);
				setErrorMessage(err.response.data.message);
			});
	}

	function goBack() {
		props.history.push(`/`);
	}

	return (
		<div className={`modal is-active sign-up-log-in  ${css(styles.bounce)}`}>
			<div
				style={{ backgroundColor: "#d5ead5" }}
				className="modal-background"></div>
			<div className="modal-content">
				<div className="columns is-mobile">
					<div className="column is-three-fifths is-offset-one-fifth container">
						<figure className="image">
							<img
								src={beetleLogo}
								alt="logo"
								style={{
									objectFit: "cover",
									borderRadius: "50%",
									height: "120px",
									width: "120px"
								}}
							/>
						</figure>
						<div className="form-container">
							<form onSubmit={handleSubmit}>
								<div className="field">
									<label className="label">Email</label>
									<div className="control">
										<input
											className="input"
											style={{ backgroundColor: "#d5ead5" }}
											type="email"
											placeholder="Enter your email"
											value={username}
											onChange={e => setUsername(e.target.value)}
										/>
									</div>
								</div>
								<div className="field">
									<label className="label">Password</label>
									<div className="control">
										<input
											style={{ backgroundColor: "#d5ead5" }}
											className="input"
											type="password"
											placeholder="Enter your password"
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</div>
								</div>
								{errorMessage && (
									<p className="is-help has-text-danger">{errorMessage}</p>
								)}
								<br />
								<div className="actions">
									<Button disabled={!username || !password} loading={loader}>
										Log In
									</Button>
									<Link to="/signup">
										<p className="has text-primary">Create an account</p>
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-close is-large" aria-label="close" onClick={goBack}>
				<AiOutlineClose />
			</div>
		</div>
	);
}

export default LogIn;
