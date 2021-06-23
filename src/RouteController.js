import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Skeleton from "./components/organisms/skeleton/Skeleton";
import AuthorPage from "./pages/authorpage";
import Blog from "./pages/blog";
import Categories from "./pages/categories";
import CreateBlog from "./pages/createBlog";
import DummyComp from "./pages/DummyComp";
import LandingPage from "./pages/landingPage";
import LogIn from "./pages/login";
import SampleComponents from "./pages/SampleComponents";
import SignUp from "./pages/signup";

function RouteController() {
	return (
		<Router>
			<Skeleton>
				<Switch>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<Route path="/signup" render={props => <SignUp {...props} />} />
					<Route
						path="/author/:id"
						render={props => <AuthorPage {...props} />}
					/>
					<Route path="/login" render={props => <LogIn {...props} />} />
					<Route path="/category" render={props => <Categories {...props} />} />
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
			</Skeleton>
		</Router>
	);
}

export default RouteController;
