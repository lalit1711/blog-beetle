import React, { useContext, useEffect, useState } from "react";
import _map from "lodash/map";
import Button from "../../atoms/button";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import axios from "axios";
import { _getFilterBlogs } from "../../../pages/landingPage/services";

import SingleComment from "./singleComment";
import { requestDataComment } from "../../../helpers/util";

function Comments({ blogId, authorId }) {
	const { user } = useContext(AuthenticatorContext);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([]);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		getComments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogId]);

	const getComments = () => {
		_getFilterBlogs(`/blogs/comment/${blogId}`).then(res => {
			setComments(res.data.comments);
		});
	};

	const handleAddComment = () => {
		if (!newComment.trim()) return null;
		setLoader(true);
		const data = { content: newComment };
		axios.post(`/blogs/comment/${blogId}`, data).then(res => {
			setNewComment("");
			setLoader(false);
			getComments();
		});
	};

	const handleDelete = id => {
		axios
			.delete(`/blogs/comment/${id}`)
			.then(res => {
				getComments();
			})
			.catch(() => {
				getComments();
			});
	};
	return (
		<div className="comment-container p-2">
			<div className="title-area">
				{/* <hr className="is-hidden-touch" />{" "} */}
				<h3
					style={{
						textAlign: "center",
						fontSize: "25px",
						fontWeight: "bold",
						marginBottom: "50px"
					}}>
					<span
						style={{
							fontSize: "35px",
							color: "#a3ce20",
							textDecoration: "underline"
						}}>
						C
					</span>
					comments
				</h3>
				{/* <hr className="is-hidden-touch" /> */}
			</div>
			<div className="main-section ">
				{comments.length ? (
					<div className="read-comment ">
						{_map(comments, comment => (
							<SingleComment
								key={comment?._id}
								comment={comment}
								authorId={authorId}
								handleDelete={handleDelete}
							/>
						))}
					</div>
				) : (
					<div className="has-text-centered">No Comments</div>
				)}
				{user && (
					<div className="write-comment columns mt-5">
						<div className="form-control column is-11 is-offset-1 is-flex-desktop">
							<div style={{ width: "100%" }} className="mb-2">
								<textarea
									className="textarea has-fixed-size"
									placeholder="Add Comment"
									value={newComment}
									onChange={e => setNewComment(e.target.value)}
								/>
							</div>

							<div className="actions">
								<Button
									disabled={loader}
									loading={loader}
									onClick={handleAddComment}>
									Comment
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Comments;
