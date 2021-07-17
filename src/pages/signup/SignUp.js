import React, { useState } from "react";
import { zoomIn } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import Button from "../../components/atoms/button";
import { Link } from "react-router-dom";
import { _createUser, _signUp } from "./services";
import beetleLogo from "../../assets/beetle.jpg";
import { AiOutlineClose } from "react-icons/ai";

function SignUp(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [loader, setLoader] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const styles = StyleSheet.create({
		bounce: {
			animationName: zoomIn,
			animationDuration: "0.4s"
		}
	});

	function handleSubmit(e) {
		setLoader(true);
		setErrorMessage("");
		e.preventDefault();
		const userData = { email, password, name };
		_signUp(userData)
			.then(user => {
				_createUser(userData, user.userSub, setLoader).then(res => {
					setLoader(false);
					props.history.push(`/category?id=${user.userSub}`);
				});
			})
			.catch(err => {
				setErrorMessage(err.message);
				setLoader(false);
			});
	}

	function goBack() {
		props.history.goBack();
	}

	return (
		<div className={`modal is-active sign-up-log-in  ${css(styles.bounce)}`}>
			<div
				style={{ backgroundColor: "#d5ead5" }}
				className="modal-background"></div>
			<div className="modal-content">
				<div className="columns is-mobile">
					<div className="column is-three-fifths is-offset-one-fifth container">
						<figure className="image ">
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
									<label className="label">Name</label>
									<div className="control">
										<input
											style={{ backgroundColor: "#d5ead5" }}
											className="input"
											type="text"
											placeholder="Enter your name"
											value={name}
											onChange={e => setName(e.target.value)}
										/>
									</div>
								</div>
								<div className="field">
									<label className="label">Email</label>
									<div className="control">
										<input
											style={{ backgroundColor: "#d5ead5" }}
											className="input"
											type="email"
											placeholder="Enter your email"
											value={email}
											onChange={e => setEmail(e.target.value)}
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
									<Button
										disabled={!email.trim() || !name.trim() || !password.trim()}
										loading={loader}>
										Sign Up
									</Button>
									<Link to="/login">
										<p className="has text-primary">
											Already have an account ?
										</p>
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

export default SignUp;
