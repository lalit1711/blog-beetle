import React, { useContext, useEffect, useState } from "react";
// components import
import { _getAllBlogs } from "./services";
import Loader from "../../common/Loader";

// blog reader

import LatestBlogs from "../../components/organisms/Blog/LatestBlogs";
import TrendingBlogs from "../../components/organisms/Blog/TrendingBlogs";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import SuggestedBlogs from "../../components/organisms/Blog/SuggestedBlogs";

function LandingPage() {
	const [blogsList, setBlogsList] = useState([]);
	const [load, setLoad] = useState(false);
	const { user } = useContext(AuthenticatorContext);
	useEffect(() => {
		setLoad(true);
		_getAllBlogs().then(res => {
			setBlogsList(res.data);
			setLoad(false);
		});
	}, []);
	return (
		<div className="landing-page">
			<div className="container">
				<TrendingBlogs blogsList={blogsList} />
				<br />
				<br />
				<br />
				<LatestBlogs blogsList={blogsList} />
				{user && user.interests && <SuggestedBlogs userId={user.id} />}
				<br />
				<br />
				<br />
			</div>
			<Loader load={load} />
		</div>
	);
}

export default LandingPage;
