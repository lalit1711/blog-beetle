import React from "react";
import Loader from "react-loader-spinner";
export default function LoaderComponent({ load = false }) {
	return (
		<>
			{load ? (
				<div
					style={{
						height: "100%",
						width: "100%",
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}>
					<span style={{ marginTop: "-25%" }}>
						{" "}
						<Loader type="Oval" color="#16a085" height={50} width={50} />
					</span>
				</div>
			) : (
				""
			)}
		</>
	);
}
