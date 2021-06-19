import "./blogBeetle.scss";

// Routes
import RouteController from "./RouteController";

// other components
import ErrorBoundary from "./pages/ErrorBoundary";
import Footer from "./components/molecules/footer";

function App() {
	return (
		<ErrorBoundary>
			<div style={{ minHeight: "45em" }}>
				<RouteController />
			</div>
			<Footer />
		</ErrorBoundary>
	);
}

export default App;
