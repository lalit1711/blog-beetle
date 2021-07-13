import React, { Component } from "react";
import ReactLottie from "../animation/LottieReact";

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo); TODO: Add sentry log error function
	}

	render() {
		console.log(this.state);
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <div style={{height:'100vh',width:'100vw',background:'#f1f2f2'}}><ReactLottie keyIndex={2} />
			{/* <h1 style={{ fontSize: '40px', fontWeight: 'bolder', textAlign: 'center' }}>Oops something went terribly wrong!</h1> */}
			</div>;
		}

		return this.props.children;
	}
}
