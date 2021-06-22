import "./blogBeetle.scss";

// Routes
import RouteController from "./RouteController";

// other components
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
	return (
		<ErrorBoundary>
			<RouteController />
		</ErrorBoundary>
	);
}

export default App;
