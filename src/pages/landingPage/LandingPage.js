import React, { useContext, useEffect, useState } from "react";
// components import
import { TEMPDATA, _getAllBlogs, _getFilterBlogs } from "./services";
import LatestBlogs from "../../components/organisms/Blog/LatestBlogs";
import TrendingBlogs from "../../components/organisms/Blog/TrendingBlogs";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import SuggestedBlogs from "../../components/organisms/Blog/SuggestedBlogs";
import TrendingLoader from "../../components/organisms/loader/TrendingLoader";
import LatestLoader from "../../components/organisms/loader/LatestLoader";
import { Fragment } from "react";
import SuggestedLoader from "../../components/organisms/loader/SuggestedLoader";
import ReactLottie from "../../animation/LottieReact";
import axios from "axios";

function LandingPage() {
	const [blogsList, setBlogsList] = useState([]);
	const [mostLikedBlogs, setMostLikedBlogs] = useState([]);
	const [triggered, setTriggered] = useState(false);
	const [blogsListLatest, setLatestBlogsList] = useState([]);
	const [load, setLoad] = useState(false);
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	const { user } = useContext(AuthenticatorContext);

	useEffect(() => {
		setTimeout(() => {
			setShowWelcomeMessage(false);
		}, 1000);
	}, []);

	useEffect(() => {
		if (!showWelcomeMessage) {
			setLoad(true);
			_getAllBlogs().then(res => {
				setBlogsList(res.data.data.blogs);
			});
			//------------------------Latest Blog Fetch------------------------
			_getFilterBlogs("/blogs").then(res => {
				setLatestBlogsList(res.data.data.blogs);
			});
		}
	}, [showWelcomeMessage, triggered]);

	useEffect(() => {
		getMostLikedBlogContent(blogsList);
	}, [blogsList]);

	const getMostLikedBlogContent = async blogsList => {
		if (blogsList) {
			let BlogsListAltered = [...blogsList];
			let sortedBlogsBasedOnLikes = BlogsListAltered.sort(compare);
			setMostLikedBlogs(sortedBlogsBasedOnLikes);
			setLoad(false);
		}
	};

	return (
		<div className="landing-page">
			{showWelcomeMessage ? (
				<>
					<WelcomeMessage />
					<ReactLottie keyIndex={1} />
				</>
			) : (
				<div>
					<WelcomeMessage Message={"Most liked blogs"} />
					<div className="container">
						<div className="mt-10">
							{!load ? (
								<TrendingBlogs
									blogsList={mostLikedBlogs}
									triggered={triggered}
									setTriggered={setTriggered}
								/>
							) : (
								<TrendingLoader />
							)}
						</div>
						<div className="mt-10">
							{!load ? (
								<LatestBlogs
									blogsList={blogsListLatest}
									triggered={triggered}
									setTriggered={setTriggered}
								/>
							) : (
								<LatestLoader />
							)}
						</div>
						<div className="mt-3">
							{!load ? (
								<Fragment>
									{user && user.interests && (
										<SuggestedBlogs
											userId={user.id}
											categories={user.interests}
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
			)}
		</div>
	);
}

const WelcomeMessage = ({ Message = "Welcome To BlogBeetle" }) => (
	<h1
		style={{
			textAlign: "center",
			fontSize: "30px",
			fontWeight: "bolder",
			marginTop: "50px",
			marginBottom: "45px"
		}}>
		{" "}
		<span
			style={{
				fontSize: "45px",
				color: "#a3ce20",
				textDecoration: "underline"
			}}>
			{Message.substring(0, 1)}
		</span>
		{Message.substring(1, Message.length)}
	</h1>
);

export default LandingPage;

function compare(a, b) {
	if (a.like.length < b.like.length) return 1;
	if (a.like.length > b.like.length) return -1;
	return 0;
}
