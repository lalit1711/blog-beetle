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
		_getFilterBlogs(
			"/blog-comments?filter=" +
				encodeURIComponent(
					JSON.stringify(requestDataComment({ blogId: blogId }))
				)
		).then(res => setComments(res.data));
	};

	const handleAddComment = () => {
		if (!newComment.trim()) return null;
		setLoader(true);
		const data = { comment: newComment, blogId: blogId, userId: user.id };
		axios.post(`/blog-comments`, data).then(res => {
			setNewComment("");
			setLoader(false);
			getComments();
		});
	};

	const handleDelete = id => {
		axios.delete(`/blog-comments/${id}`).then(res => {
			getComments();
		});
	};
	return (
		<div className="comment-container p-2">
			<div className="title-area">
				<hr className="is-hidden-touch" />{" "}
				<div className="subtitle has-text-weight-bold">Comments</div>
				<hr className="is-hidden-touch" />
			</div>
			<div className="main-section ">
				<div className="read-comment ">
					{_map(comments, comment => (
						<SingleComment
							key={comment.id}
							comment={comment}
							authorId={authorId}
							handleDelete={handleDelete}
						/>
					))}
				</div>
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
