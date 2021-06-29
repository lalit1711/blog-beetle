import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/atoms/button";
import Editor from "../../components/organisms/Editor";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import { _getBlogById } from "../blog/services";
import { _createAndEditBlog } from "./services";

function CreateBlog(props) {
	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [loader, setLoader] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const { user } = useContext(AuthenticatorContext);

	useEffect(() => {
		if (!user) props.history.push("/login");
		if (user === 1) return;
		checkIsValidEditBlog();
	}, [user]);

	const checkIsValidEditBlog = async () => {
		if (props.match.path.indexOf("edit-blog") > -1) {
			const blogId = props.match.params.id;
			const { data } = await _getBlogById(blogId);
			if (data.authorId !== user.id) {
				props.history.push(`/`);
			} else {
				setEdit(data);
				setTitle(data.title);
				setValue(data.blogContent);
			}
		}
	};

	const handleBlog = () => {
		setLoader(true);
		const dataToSend = {
			authorId: user.id,
			title: title,
			coverImgSrc: "",
			subTitle: "",
			blogContent: value
		};
		const url = isEdit ? `/blogs/${isEdit.id}` : `/blogs`;
		const method = isEdit ? "PUT" : "POST";
		_createAndEditBlog(dataToSend, method, url)
			.then(res => {
				setLoader(false);
				if (isEdit) props.history.push(`/blog/${isEdit.id}`);
				else {
					props.history.push(`/blog/${res.data.id}`);
				}
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
