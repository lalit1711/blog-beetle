import React, { useContext, useEffect, useState } from "react";
// components import
import { _getAllBlogs } from "./services";
import LatestBlogs from "../../components/organisms/Blog/LatestBlogs";
import TrendingBlogs from "../../components/organisms/Blog/TrendingBlogs";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import SuggestedBlogs from "../../components/organisms/Blog/SuggestedBlogs";
import TrendingLoader from "../../components/organisms/loader/TrendingLoader";
import LatestLoader from "../../components/organisms/loader/LatestLoader";
import { Fragment } from "react";
import SuggestedLoader from "../../components/organisms/loader/SuggestedLoader";
import ReactLottie from "../../animation/LottieReact";

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
				<h1 style={{ textAlign: "center", fontSize: '45px', fontWeight: "bold" }}> <span style={{ fontSize: '70px', color: '#a3ce20',textDecoration:'underline' }}>W</span>elcome to BlogBeetle</h1>
				<ReactLottie keyIndex={1} />
				<hr style={{marginTop:'-40px'}}/>
				<h1 style={{ textAlign: "center", fontSize: '25px', fontWeight: "bold" }}> <span style={{ fontSize: '40px', color: '#a3ce20',textDecoration:'underline' }}>O</span>ur trending blog posts</h1>
				<div style={{ marginTop: "5%" }}>
					{!load ? <TrendingBlogs blogsList={blogsList} /> : <TrendingLoader />}
				</div>
				<div style={{ marginTop: "8%" }}>
					{!load ? <LatestBlogs blogsList={blogsList} /> : <LatestLoader />}
				</div>
				<div style={{ margin: "1% 0%" }}>
					{!load ? (
						<Fragment>
							{user && user.interests && (
								<SuggestedBlogs
									userId={user.id}
									categories={user.interests.split(",")}
								/>
							)}
						</Fragment>
					) : (
						<SuggestedLoader />
					)}
					<ReactLottie />
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
