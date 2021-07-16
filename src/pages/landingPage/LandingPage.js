import React, { useContext, useEffect, useState } from "react";
// components import
import { _getAllBlogs, _getFilterBlogs } from "./services";
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

	const [blogsListLatest, setLatestBlogsList] = useState([]);
	const [load, setLoad] = useState(false);
	const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
	const { user } = useContext(AuthenticatorContext);
	useEffect(() => {
		setTimeout(() => {
			setShowWelcomeMessage(false)
		}, 6000)
	}, []);
	useEffect(() => {
		if (!showWelcomeMessage) {
			setLoad(true);
			_getAllBlogs().then(res => {
				setBlogsList(res.data);
				setLoad(false);
			});
			//------------------------Latest Blog Fetch------------------------
			let requestData = {
				"offset": 0,
				"limit": 100,
				"skip": 0,
				"order": "createdAt DESC",
				"fields": {
					"id": true,
					"title": true,
					"coverImgSrc": true,
					"subTitle": true,
					"authorId": true,
					"blogContent": true,
					"published": true,
					"categories": true,
					"createdAt": true,
					"updatedAt": true
				}
			}

			setLoad(true);
			_getFilterBlogs("/blogs?filter=" + encodeURIComponent(JSON.stringify(requestData))).then(res => {
				setLatestBlogsList(res.data);
				setLoad(false);
			})



		}
	}, [showWelcomeMessage])


	// const getMostLikedBlogContent=()=>{
	// 	axios.get("/blogs?filter=")
	// }	


	return (
		<div className="landing-page">
			{showWelcomeMessage ? <>
				<WelcomeMessage />
				<ReactLottie keyIndex={1} />
			</> : (<div className="container">
				<div className="mt-10">
					{!load ? <TrendingBlogs blogsList={blogsList} /> : <TrendingLoader />}
				</div>
				<div className="mt-10">
					{!load ? <LatestBlogs blogsList={blogsListLatest} /> : <LatestLoader />}
				</div>
				<div className="mt-3">
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
			)}

		</div>
	);
}



const WelcomeMessage = () => <h1 style={{ textAlign: "center", fontSize: '30px', fontWeight: "bolder", marginTop: '50px',marginBottom:'45px' }}> <span style={{ fontSize: '45px', color: '#a3ce20', textDecoration: 'underline' }}>W</span>elcome To BlogBeetle</h1>


export default LandingPage;
