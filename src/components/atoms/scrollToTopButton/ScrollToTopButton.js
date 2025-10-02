import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import "./ScrollToTopButton.scss";

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled down
	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	// Smooth scroll to top
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<>
			{isVisible && (
				<button
					className="scroll-to-top-button"
					onClick={scrollToTop}
					title="Scroll to top"
					aria-label="Scroll to top">
					<FaChevronUp />
				</button>
			)}
		</>
	);
};

export default ScrollToTopButton;
