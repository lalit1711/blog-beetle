import "./blogBeetle.scss";

// Routes
import RouteController from "./RouteController";

// other components
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
	return (
		<div>
			<ErrorBoundary>
				<RouteController />
			</ErrorBoundary>
		</div>
	);
}

export default App;
