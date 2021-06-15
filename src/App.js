import logo from "./logo.svg";
import "./App.css";
import "./blogBeetle.scss";

import RouteController from "./RouteController";
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary>
			<div>
				<RouteController />
			</div>
		</ErrorBoundary>
	);
}

export default App;
