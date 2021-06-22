import React from "react";
import Footer from "../../molecules/footer";
import Navbar from "../../molecules/navbar";

function Skeleton({ children }) {
	return (
		<div>
			<Navbar />
			<div style={{ minHeight: "37em" }}>{children}</div>
			<Footer />
		</div>
	);
}

export default Skeleton;
