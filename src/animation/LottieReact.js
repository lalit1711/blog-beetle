import React from "react";
import bloggerAnimation from "./blogger.json";
import beetleAnimation from "./beetle.json";
import ERROR from "./error.json";
import NoSuggestedBlogs from "./noSuggestion.json";
import NDA from "./NDA.json";
import { useLottie } from "lottie-react";

const ReactLottie = ({ keyIndex = 0 }) => {
	const chooseJson = [bloggerAnimation, beetleAnimation, ERROR, NDA, NoSuggestedBlogs];
	const options = {
		animationData: chooseJson[keyIndex],
		loop: true,
		autoplay: true,
		style: {
			height: keyIndex === 4 ? "100px" : (keyIndex === 2 ? "500px" : keyIndex === 1 ? "360px" : "180px"),
			marginTop: 0
			// width: '250px'
		},
		interactivity: {
			mode: "cursor",
			actions: [
				{
					position: { x: [0, 1], y: [0, 1] },
					type: "seek",
					frames: [0, 480]
				}
			]
		}
	};

	const { View } = useLottie(options);

	return <div draggable="true">{View}</div>;
};

export default ReactLottie;
