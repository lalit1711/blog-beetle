import React from "react";
import Button from "../components/atoms/button";
import SelectBox from "../components/atoms/selectBox";

function SampleComponents() {
	return (
		<div>
			<button className="button is-primary is-outlined is-rounded">Save</button>
			<button className="button is-primary is-outlined is-rounded">
				Publish
			</button>
			<br />
			<Button>Cancel</Button>
			<button className="button is-light is-outlined is-rounded">Cancel</button>
			<br />
			<button className="button is-dark is-outlined is-rounded">Edit</button>
			<div className="container">
				<div className="field">
					<label className="label">Name</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="Enter your name"
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Email</label>
					<div className="control">
						<input
							className="input"
							type="text"
							placeholder="Enter your email"
						/>
					</div>
				</div>
				<div className="field">
					<label className="label">Bio</label>
					<div className="control">
						<textarea
							className="textarea has-fixed-size"
							placeholder="Enter your bio"
						/>
					</div>
					<p className="help has-text-black">Max 160 characters</p>
				</div>
				<br />
				<SelectBox />
				<br />
				<span className="tag is-medium is-primary">Frontend</span>
			</div>
		</div>
	);
}

export default SampleComponents;
