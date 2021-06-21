import React, { useState } from "react";
import Button from "../../components/atoms/button";
import Editor from "../../components/organisms/Editor";
import { _createBlog } from "./services";

function CreateBlog(props) {
	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [loader, setLoader] = useState(false);
	const handleBlog = () => {
		setLoader(true);
		const dataToSend = {
			title: title,
			coverImgSrc: "",
			subTitle: "",
			blogContent: value
		};
		_createBlog(dataToSend)
			.then(res => {
				setLoader(false);
				props.history.push(`/blog/${res.data.id}`);
			})
			.catch(err => {
				setLoader(false);
				alert("Oops! something went wrong");
			});
	};

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
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
							{/* <div className="select-box-area">
								<SelectBox />
							</div> */}
						</div>
						<div className="editor-container">
							<Editor value={value} setValue={setValue} />
						</div>
					</div>
				</div>
			</div>
			<div className="column is-2 actions">
				<Button onClick={handleBlog} loading={loader} disabled={loader}>
					Save
				</Button>
				{/* <Button outlined={false}>Publish</Button> */}
				<Button type="is-light" onClick={() => setValue("")}>
					Cancel
				</Button>
			</div>
		</div>
	);
}

export default CreateBlog;
