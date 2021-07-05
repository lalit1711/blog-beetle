import React, { useContext, useEffect, useState } from "react";
import dateformat from "dateformat";
import UserReader from "../../../readers/user";
import { IMG_SRC } from "../../../constants/user";
import { _getUserInfo } from "../../../pages/login/services";
import { Link } from "react-router-dom";
import { AuthenticatorContext } from "../../../context/authenticatorContext";

function SingleComment({ comment, authorId, handleDelete }) {
	const { user } = useContext(AuthenticatorContext);
	const [commentUser, setCommentUser] = useState(null);
	console.log(commentUser);
	useEffect(() => {
		_getUserInfo(comment.userId).then(res => {
			setCommentUser(res.data);
		});
	}, [comment]);
	if (commentUser)
		return (
			<div className="mt-5">
				<div className="columns single-comment">
					<div className="column is-1">
						<div
							className="user-image"
							style={{
								backgroundImage: `url(${commentUser.imgSrc || IMG_SRC})`
							}}></div>
					</div>
					<div className="column ">
						<div className="name-date is-flex">
							<Link to={`/author/${commentUser.id}`}>
								<div className="subtitle has-text-dark has-text-weight-semibold">
									{commentUser.fullName}
								</div>
							</Link>
							<div className="date ">
								{dateformat(comment.createdAt, "mediumDate")}
							</div>
						</div>
						<div className="content-crud is-flex-desktop">
							<div className="comment">{comment.comment}</div>
							<div className="edit-delete">
								{(user && authorId === user.id) ||
									(user && user.id === comment.userId && (
										<img
											src="/icons/trash.svg"
											alt="search-img"
											onClick={() => handleDelete(comment.id)}
										/>
									))}
								{/* <img src="/icons/edit.svg" alt="search-img" /> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	return null;
}

export default SingleComment;
