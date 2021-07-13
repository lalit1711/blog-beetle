import React, { useContext, useState } from "react";
import { flipInY } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import Button from "../../components/atoms/button";
import { Link } from "react-router-dom";
import { _getUserInfo, _signIn } from "./services";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import beetleLogo from "./../../assets/beetle.jpg"

function LogIn(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loader, setLoader] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { userLoggedIn } = useContext(AuthenticatorContext);

	const styles = StyleSheet.create({
		bounce: {
			animationName: flipInY,
			animationDuration: "0.5s"
		}
	});

	async function handleSubmit(e) {
		e.preventDefault();
		setLoader(true);
		setErrorMessage("");
		const cognitoIdentity = await _signIn(
			username,
			password,
			setLoader,
			setErrorMessage
		);
		setLoader(false);
		if (!cognitoIdentity) return;
		const user = await _getUserInfo(cognitoIdentity.attributes.sub);

		if (!user) return;
		localStorage.setItem("user", JSON.stringify(user.data));
		userLoggedIn();
		props.history.push(`/`);
	}

	function goBack() {
		props.history.push(`/`);
	}

	return (
		<div className={`modal is-active sign-up-log-in  ${css(styles.bounce)}`}>
			<div class="modal-background"></div>
			<div class="modal-content">
				<div className="columns is-mobile">
					<div className="column is-three-fifths is-offset-one-fifth container">
						<figure class="image">
							<img src={beetleLogo} alt="logo" style={{objectFit:"cover",borderRadius:'50%',height:'120px',width:'120px'}} />
						</figure>
						<div className="form-container">
							<form onSubmit={handleSubmit}>
								<div className="field">
									<label className="label">Email</label>
									<div className="control">
										<input
											className="input"
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
			<button
				class="modal-close is-large"
				aria-label="close"
				onClick={goBack}></button>
		</div>
	);
}

export default LogIn;
