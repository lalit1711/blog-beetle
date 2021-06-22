import React, { useEffect } from "react";
import { flipInY } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import Button from "../../components/atoms/button";
import { Link } from "react-router-dom";

function SignUp(props) {
	console.log(props);
	const styles = StyleSheet.create({
		bounce: {
			animationName: flipInY,
			animationDuration: "0.5s"
		}
	});

	function handleSubmit(e) {
		console.log("e", e);
	}

	function goBack() {
		props.history.goBack();
	}

	return (
		<div className={`modal is-active sign-up-log-in  ${css(styles.bounce)}`}>
			<div class="modal-background"></div>
			<div class="modal-content">
				<div className="columns is-mobile">
					<div className="column is-three-fifths is-offset-one-fifth container">
						<figure class="image is-128x128">
							<img src="/logo.png" />
						</figure>
						<div className="form-container">
							<form onSubmit={handleSubmit}>
								<div className="field">
									<label className="label">Name</label>
									<div className="control">
										<input
											className="input"
											type="email"
											placeholder="Enter your name"
										/>
									</div>
								</div>
								<div className="field">
									<label className="label">Email</label>
									<div className="control">
										<input
											className="input"
											type="email"
											placeholder="Enter your email"
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
										/>
									</div>
								</div>
								<br />
								<div className="actions">
									<Button>Sign Up</Button>
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
			<button
				class="modal-close is-large"
				aria-label="close"
				onClick={goBack}></button>
		</div>
	);
}

export default SignUp;
