import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/atoms/button";
import SelectBox from "../../components/atoms/selectBox";
import Editor from "../../components/organisms/Editor";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import { _getBlogById } from "../blog/services";
import { _createAndEditBlog } from "./services";

function CreateBlog(props) {
	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [category, setCategory] = useState(null);
	const [list, setList] = useState([]);
	const [loader, setLoader] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const { user } = useContext(AuthenticatorContext);

	useEffect(() => {
		if (!user) props.history.push("/login");
		if (user === 1) return;
		checkIsValidEditBlog();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, props.history]);

	useEffect(() => {
		axios.get(`/categories`).then(res => {
			setList(convertCategoryForSelectBox(res.data));
		});
	}, []);

	useState(() => {
		setCategory(list[0]);
	}, [list]);

	const convertCategoryForSelectBox = arr => {
		return arr.map(o => {
			return { value: o.id, label: o.categoryName };
		});
	};

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
				setCategory({ label: data.categories, value: data.categories });
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
			categories: category && category.label,
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
							<div className="select-box-area">
								<SelectBox
									options={list}
									value={category}
									onChange={e => setCategory(e)}
								/>
							</div>
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
