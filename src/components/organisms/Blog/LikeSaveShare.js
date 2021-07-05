import React, { Fragment, useContext, useState } from "react";
import {
	FaBookmark,
	FaFacebook,
	FaGithub,
	FaLinkedin,
	FaThumbsUp,
	FaTwitter
} from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import { _deleteBlog } from "../../../pages/blog/services";
import ConfirmationBox from "../../molecules/confirmationBox";
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton
} from "react-share";

function LikeSaveShare({ blogInfo }) {
	const [openConfirmationBox, setOpenConfirmationBox] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const { user } = useContext(AuthenticatorContext);

	console.log(location);

	const deleteBlog = async () => {
		await _deleteBlog(blogInfo.id);
		history.push("/");
	};

	const handleDelete = () => setOpenConfirmationBox(true);

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
									<AiOutlineLike />
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
