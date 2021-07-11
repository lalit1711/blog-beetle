
import React from "react";
import bloggerAnimation from "./blogger.json"
import beetleAnimation from "./beetle.json"
import { useLottie } from "lottie-react";



const ReactLottie = ({ keyIndex = 0 }) => {
    console.log("---&KEY", keyIndex)
    const chooseJson = [bloggerAnimation, beetleAnimation]
    const options = {
        animationData: chooseJson[keyIndex],
        loop: true,
        autoplay: true,
        style: {
            height: keyIndex===1?"340px":'180px',
            marginTop: 0
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

    return (<>{View}</>)

}

export default ReactLottie