import React, { Fragment, useContext, useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import {
	_deleteBlog,
	_getLikeCount,
	_likeBlog,
	_removeSavedBlog,
	_revokeLike,
	_reLike,
	_getCurrentUserContextLikes
} from "../../../pages/blog/services";
import ConfirmationBox from "../../molecules/confirmationBox";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton
} from "react-share";
import axios from "axios";
import { BiMessageSquareEdit, BiTrash } from "react-icons/bi";
import { requestDataUserLikesBlog } from "../../../helpers/util";

function LikeSaveShare({
	blogInfo,
	fixed = false,
	triggered = false,
	setTriggered = () => {},
	onlyView = false
}) {
	const [openConfirmationBox, setOpenConfirmationBox] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const { user } = useContext(AuthenticatorContext);
	const [likeId, setLikeId] = useState(0);
	const [saveId, setSaveId] = useState(0);
	const [count, setCount] = useState(0);

	// get likes count
	useEffect(() => {
		if (!blogInfo) return;
		setCount(blogInfo.like.length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogInfo]);

	// find out weather loggedIn user has liked the blog or not
	useEffect(() => {
		if (!user || !blogInfo || user === 1 || blogInfo === "" || onlyView) return;

		// alert("USERID:"+user.id)

		axios.get(`/blogs/like/${blogInfo._id}`).then(res => {
			setLikeId(res.data.data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, blogInfo]);

	// find out weather loggedIn user has saved the blog or not
	useEffect(() => {
		if (!user || !blogInfo || user === 1 || blogInfo === "" || onlyView) return;
		axios.get(`/users/save/${blogInfo._id}`).then(res => {
			setSaveId(res.data.data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, blogInfo]);

	const deleteBlog = async () => {
		await _deleteBlog(blogInfo.id);
		if (location.pathname.indexOf("/blog/") > -1) history.push("/");
		else {
			setTriggered(!triggered);
			setOpenConfirmationBox(false);
		}
	};

	const handleDelete = () => setOpenConfirmationBox(true);

	const handleLike = () => {
		_likeBlog(blogInfo._id).then(res => {
			setCount(res.data.data ? count + 1 : count - 1);
			setLikeId(res.data.data);
		});
	};

	const handleSave = () => {
		axios.patch(`/users/save/${blogInfo._id}?save=${!saveId}`).then(res => {
			setSaveId(res.data.data);
		});
	};

	const closeConfirmationBox = () => setOpenConfirmationBox(false);

	return (
		<Fragment>
			<div className={`like-save-share-section `}>
				<div className={`${!onlyView && "social-section"}`}>
					{user && !onlyView ? (
						user.id === blogInfo.authorId ? (
							<Fragment>
								<Link to={`/edit-blog/${blogInfo.id}`}>
									<span>
										<BiMessageSquareEdit />
									</span>
								</Link>

								<span onClick={handleDelete}>
									<BiTrash />
								</span>
							</Fragment>
						) : (
							<Fragment>
								<span className="count has-text-primary">{count}</span>
								<span>
									{likeId ? (
										<AiFillLike
											style={{ cursor: "pointer" }}
											className="animateLikeButton"
											onClick={handleLike}
										/>
									) : (
										<AiOutlineLike
											style={{ cursor: "pointer" }}
											onClick={handleLike}
										/>
									)}
								</span>
								<span>
									{saveId ? (
										<BsBookmarkFill
											style={{ cursor: "pointer" }}
											className="animateSaveButton"
											onClick={handleSave}
										/>
									) : (
										<BsBookmark
											style={{ cursor: "pointer" }}
											onClick={handleSave}
										/>
									)}
								</span>
							</Fragment>
						)
					) : (
						<span className="has-text-primary">{count + " Likes"}</span>
					)}
				</div>
				{!fixed && (
					<div className={`${!onlyView && "social-section"}`}>
						<FacebookShareButton
							url={`http://3.7.98.9:4000/${location.pathname}`}>
							<FaFacebook />
						</FacebookShareButton>

						<TwitterShareButton
							url={`http://3.7.98.9:4000/${location.pathname}`}>
							<FaTwitter />
						</TwitterShareButton>

						<LinkedinShareButton
							url={`http://3.7.98.9:4000/${location.pathname}`}>
							<FaLinkedin />
						</LinkedinShareButton>
					</div>
				)}
			</div>
			<ConfirmationBox
				primaryAction={deleteBlog}
				secondaryAction={closeConfirmationBox}
				secondaryButton="Cancel"
				primaryButton="Delete"
				open={openConfirmationBox}
				onClose={closeConfirmationBox}
				message="Are you sure you want to delete this blog"
			/>
		</Fragment>
	);
}

export default LikeSaveShare;
