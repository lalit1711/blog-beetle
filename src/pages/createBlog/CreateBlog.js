import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Button from "../../components/atoms/button";
import Editor from "../../components/organisms/Editor";
import { AuthenticatorContext } from "../../context/authenticatorContext";
import { _getBlogById } from "../blog/services";
import { _createAndEditBlog } from "./services";

function CreateBlog(props) {
	const [title, setTitle] = useState("");
	const [subTitle, setSubTitle] = useState("");
	const [value, setValue] = useState("");
	const [category, setCategory] = useState(null);
	const [list, setList] = useState([]);
	const [loader, setLoader] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [isPublished, setIsPublished] = useState("0");
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
				setSubTitle(data.subTitle);
				setValue(data.blogContent);
				setCategory({ label: data.categories, value: data.categories });
				setIsPublished(data.published);
			}
		}
	};

	const handleBlog = (publish = "1") => {
		setLoader(true);
		const dataToSend = {
			authorId: user.id,
			title: title,
			coverImgSrc: "",
			subTitle: subTitle,
			categories: category && category.label,
			blogContent: value,
			published: publish,
			createdAt: new Date().toISOString().slice(0, 19).replace("T", " ")
		};
		const url = isEdit ? `/blogs/${isEdit.id}` : `/blogs`;
		const method = isEdit ? "PUT" : "POST";
		_createAndEditBlog(dataToSend, method, url)
			.then(res => {
				setLoader(false);
				if (isEdit) props.history.push(`/blog/${isEdit.id}`);
				else {
					if (publish === "1") props.history.push(`/blog/${res.data.id}`);
				}
			})
			.catch(err => {
				setLoader(false);
				// alert("Oops! something went wrong");
			});
	};

	const shouldDisabledPublishButton = (button = "published") => {
		if (!title.trim()) return true;
		if (!category) return true;
	};

	const clearAllValues = () => {
		setValue("");
		setTitle("");
		setSubTitle("");
		setCategory(null);
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
								maxLength={70}
							/>
							<input
								type="text"
								className="input is-medium mt-5"
								placeholder="Subtitle"
								value={subTitle}
								onChange={e => setSubTitle(e.target.value)}
								maxLength={50}
							/>
							<div className="select-box-area">
								<Select
									id="select-box"
									options={list}
									classNamePrefix="select"
									placeholder="Category"
									onChange={e => setCategory(e)}
									value={category}
								/>
							</div>
						</div>
						<div className="editor-container">
							<Editor value={value} setValue={setValue} />
						</div>
					</div>
				</div>
			</div>
			<div className="column is-2 actions is-flex-desktop">
				<Button
					onClick={() => handleBlog(isPublished)}
					loading={loader}
					disabled={loader || shouldDisabledPublishButton()}>
					Save
				</Button>
				<Button
					outlined={false}
					disabled={
						loader || isPublished === "1" || shouldDisabledPublishButton()
					}
					loading={loader}
					onClick={() => handleBlog("1")}>
					{isPublished === "0" ? "Publish" : "Published"}
				</Button>
				<Button type="is-light" onClick={clearAllValues}>
					Clear All
				</Button>
				<Link to="/">
					<Button type="is-danger">Cancel</Button>
				</Link>
			</div>
		</div>
	);
}

export default CreateBlog;
