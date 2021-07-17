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
		_getLikeCount(blogInfo.id).then(res => {
			setCount(res.data.count);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [likeId, blogInfo]);

	// find out weather loggedIn user has liked the blog or not
	useEffect(() => {
		if (!user || !blogInfo || user === 1 || blogInfo === "" || onlyView) return;

		// alert("USERID:"+user.id)

		axios
			.get(
				"/blog-likes?filter=" +
					encodeURIComponent(
						JSON.stringify(requestDataUserLikesBlog(blogInfo.id, user.id))
					)
			)
			.then(res => {
				if (res.data.length) {
					setLikeId(res.data[0].id);
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, blogInfo, likeId]);

	// find out weather loggedIn user has liked the blog or not
	useEffect(() => {
		if (!user || !blogInfo || user === 1 || blogInfo === "" || onlyView) return;
		axios
			.get(
				"/saved-blogs?filter=" +
					encodeURIComponent(
						JSON.stringify(requestDataUserLikesBlog(blogInfo.id, user.id))
					)
			)
			.then(res => {
				if (res.data.length) {
					setSaveId(res.data[0].id);
				}
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
		const userBlogInfo = {
			userId: user.id,
			blogId: blogInfo.id
		};
		const data = {
			where: userBlogInfo
		};

		_getCurrentUserContextLikes(data).then(res => {
			if (res.data.length === 0) {
				_likeBlog(userBlogInfo).then(res => {
					setLikeId(res.data.id);
				});
			}
			if (res.data.length > 0) {
				if (res.data[0].active) {
				} else {
					_reLike(userBlogInfo).then(respp => {
						setLikeId(1);
					});
				}
			}
		});
	};

	const handleSave = () => {
		const data = {
			userId: user.id,
			blogId: blogInfo.id,
			active: 1
		};
		axios.post(`/saved-blogs`, data).then(res => {
			setSaveId(res.data.id);
		});
	};

	const handleLikeDelete = () => {
		const data = {
			userId: user.id,
			blogId: blogInfo.id
		};
		_revokeLike(data).then(res => {
			setLikeId(0);
		});
	};

	const handleSavedDelete = () => {
		_removeSavedBlog(saveId).then(res => {
			setSaveId(0);
			setTriggered(!triggered);
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
											onClick={handleLikeDelete}
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
											onClick={handleSavedDelete}
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
