import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DummyComp from "./pages/DummyComp";
import SampleComponents from "./pages/SampleComponents";

function RouteController() {
	return (
		<Router>
			<Switch>
				<Route path="/sample">
					<SampleComponents />
				</Route>
				<Route path="/dummy">
					<DummyComp />
				</Route>
				<Route path="*">
					<p>No Match</p>
				</Route>
			</Switch>
		</Router>
	);
}

export default RouteController;