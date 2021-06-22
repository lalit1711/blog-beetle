import "./blogBeetle.scss";

// Routes
import RouteController from "./RouteController";

// other components
import ErrorBoundary from "./pages/ErrorBoundary";
import Footer from "./components/molecules/footer";

function App() {
	return (
		<ErrorBoundary>
			<RouteController />
		</ErrorBoundary>
	);
}

export default App;
