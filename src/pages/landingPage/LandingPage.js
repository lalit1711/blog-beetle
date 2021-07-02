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
				<div style={{ marginTop: "5%" }}>
					<TrendingBlogs blogsList={blogsList} />
				</div>
				<div style={{ marginTop: "5%" }}>
					<LatestBlogs blogsList={blogsList} />
				</div>
				<div style={{ margin: "1% 0%" }}>
					{user && user.interests && <SuggestedBlogs userId={user.id} />}
				</div>
			</div>
			<Loader load={load} />
		</div>
	);
}

export default LandingPage;
