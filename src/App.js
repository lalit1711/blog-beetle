import logo from "./logo.svg";

import "./blogBeetle.scss";

import RouteController from "./RouteController";
import ErrorBoundary from "./pages/ErrorBoundary";
import Navbar from "./components/molecules/navbar";
import Footer from "./components/molecules/footer";

function App() {
	return (
		<ErrorBoundary>
			<Navbar />
			<div>
				<RouteController />
			</div>
			<Footer />
		</ErrorBoundary>
	);
}

export default App;
