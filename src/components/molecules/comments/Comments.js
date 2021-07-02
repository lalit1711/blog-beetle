import React from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { IMG_SRC } from "../../../constants/user";
import Button from "../../atoms/button";

function Comments() {
	return (
		<div className="comment-container p-2">
			<div className="title-area">
				<hr className="is-hidden-touch" />{" "}
				<div className="subtitle has-text-weight-bold">Comments</div>
				<hr className="is-hidden-touch" />
			</div>
			<div className="main-section ">
				<div className="read-comment ">
					<div className="columns">
						<div className="column is-1">
							<div
								className="user-image"
								style={{
									backgroundImage: `url(${IMG_SRC})`
								}}></div>
						</div>
						<div className="column ">
							<div className="name-date is-flex">
								<div className="subtitle has-text-dark">Lalit Sharma</div>
								<div className="date subtitle"> 09 may 2021</div>
							</div>
							<div className="content-crud is-flex-desktop">
								<div className="comment">
									Veniam voluptate labore occaecat reprehenderit dolore fugiat
									anim eiusmod id sit ipsum enim minim incididunt. Lorem Lorem
									sit ullamco pariatur pariatur ex ipsum duis enim Lorem tempor.
									Eiusmod et amet id sit reprehenderit tempor consequat
									voluptate sint occaecat labore ut qui.
								</div>
								<div className="edit-delete">
									<img src="/icons/trash.svg" alt="search-img" />
									<img src="/icons/edit.svg" alt="search-img" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="write-comment columns mt-5">
					<div className="form-control column is-10 is-offset-1 is-flex-desktop">
						<div style={{ width: "100%" }}>
							<textarea
								className="textarea has-fixed-size"
								placeholder="Add Comment"
							/>
						</div>

						<div className="actions">
							<Button>Comment</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Comments;
