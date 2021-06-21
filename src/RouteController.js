import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/molecules/navbar";
import Blog from "./pages/blog";
import CreateBlog from "./pages/createBlog";
import DummyComp from "./pages/DummyComp";
import LandingPage from "./pages/landingPage";
import SampleComponents from "./pages/SampleComponents";

function RouteController() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<LandingPage />
				</Route>
				<Route
					path="/create-blog"
					render={props => <CreateBlog {...props} />}
				/>
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
