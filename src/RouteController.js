import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import DummyComp from "./pages/DummyComp";
import SampleComponents from "./pages/SampleComponents";

function RouteController() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<CreateBlog />
				</Route>
				<Route path="/sample">
					<SampleComponents />
				</Route>
				<Route path="/dummy">
					<DummyComp />
				</Route>
				<Route path="/blog/:id" render={props => <Blog {...props} />} />

				<Route path="*">
					<p>No Match</p>
				</Route>
			</Switch>
		</Router>
	);
}

export default RouteController;
