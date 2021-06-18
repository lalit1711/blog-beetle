import React from "react";
import Button from "../components/atoms/button";
import SelectBox from "../components/atoms/selectBox";
import Editor from "../components/organisms/Editor";

function CreateBlog() {
	return (
		<div className="columns create-blog">
			<div className="column is-2"></div>
			<div className="column is-8">
				<div
					className="container columns "
					style={{ justifyContent: "center" }}>
					<div className=" column is-four-fifths ">
						<div className="create-blog-container">
							<input
								type="text"
								className="input is-large"
								placeholder="Title"
							/>
							<div className="select-box-area">
								<SelectBox />
							</div>
						</div>
						<div className="editor-container">
							<Editor />
						</div>
					</div>
				</div>
			</div>
			<div className="column is-2 actions">
				<Button>Save</Button>
				<Button outlined={false}>Publish</Button>
				<Button type="is-light">Cancel</Button>
			</div>
		</div>
	);
}

export default CreateBlog;
