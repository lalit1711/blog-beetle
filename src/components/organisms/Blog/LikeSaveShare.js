import React, { Fragment, useContext, useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import {
	_deleteBlog,
	_getLikeCount,
	_likeBlog,
	_revokeLike
} from "../../../pages/blog/services";
import ConfirmationBox from "../../molecules/confirmationBox";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton
} from "react-share";
import axios from "axios";
import { requestDataUserLikesBlog } from "../../../helpers/util";

function LikeSaveShare({ blogInfo }) {
	const [openConfirmationBox, setOpenConfirmationBox] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const { user } = useContext(AuthenticatorContext);
	const [likeId, setLikeId] = useState(0);
	const [count, setCount] = useState(0);

	const deleteBlog = async () => {
		await _deleteBlog(blogInfo.id);
		history.push("/");
	};

	const handleDelete = () => setOpenConfirmationBox(true);

	const handleLike = (like = true) => {
		const data = {
			userId: user.id,
			blogId: blogInfo.id,
			active: 1
		};
		_likeBlog(data).then(res => setLikeId(res.data.id));
	};

	useEffect(() => {
		if (!blogInfo) return;
		_getLikeCount(blogInfo.id).then(res => setCount(res.data.count));
	}, [likeId, blogInfo]);

	const handleLikeDelete = () => {
		_revokeLike(likeId).then(res => setLikeId(0));
	};

	useEffect(() => {
		if (!user || !blogInfo || user === 1 || blogInfo === "") return;
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
	}, [user, blogInfo]);

	const closeConfirmationBox = () => setOpenConfirmationBox(false);
	return (
		<Fragment>
			<div className="like-save-share-section">
				<div className="social-section" style={{ margin: "20px 0px" }}>
					{user ? (
						user.id === blogInfo.authorId ? (
							<Fragment>
								<Link to={`/edit-blog/${blogInfo.id}`}>
									<span>
										<img src="/icons/edit.svg" alt="search-img" />
									</span>
								</Link>

								<span>
									<img
										src="/icons/trash.svg"
										alt="search-img"
										onClick={handleDelete}
									/>
								</span>
							</Fragment>
						) : (
							<Fragment>
								<span>
									{likeId ? (
										<AiFillLike onClick={handleLikeDelete} />
									) : (
										<AiOutlineLike onClick={handleLike} />
									)}
									<span className="count">{count}</span>
								</span>
								<span>
									<FiBookmark />
								</span>
							</Fragment>
						)
					) : null}
				</div>
				<div className="social-section" style={{ margin: "20px 0px" }}>
					<FacebookShareButton url={`https://localhost/${location.pathname}`}>
						<FaFacebook />
					</FacebookShareButton>

					<TwitterShareButton url={`https://localhost/${location.pathname}`}>
						<FaTwitter />
					</TwitterShareButton>

					<LinkedinShareButton url={`https://localhost/${location.pathname}`}>
						<FaLinkedin />
					</LinkedinShareButton>
				</div>
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
