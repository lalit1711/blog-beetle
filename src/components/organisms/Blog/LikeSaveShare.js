import React, { Fragment, useContext, useState } from "react";
import {
	FaBookmark,
	FaEdit,
	FaFacebook,
	FaGithub,
	FaThumbsUp,
	FaTrash,
	FaTwitter
} from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { AuthenticatorContext } from "../../../context/authenticatorContext";
import { _deleteBlog } from "../../../pages/blog/services";
import ConfirmationBox from "../../molecules/confirmationBox";

function LikeSaveShare({ blogInfo }) {
	const [openConfirmationBox, setOpenConfirmationBox] = useState(false);
	const history = useHistory();
	const { user } = useContext(AuthenticatorContext);

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
					{user && user.id === blogInfo.authorId ? (
						<Fragment>
							<Link to={`/edit-blog/${blogInfo.id}`}>
								<span>
									<img src="/icons/edit.svg" alt="search-img" />
								</span>
							</Link>

							<span>
								<img src="/icons/trash.svg" alt="search-img" />
							</span>
						</Fragment>
					) : (
						<Fragment>
							<span>
								<FaThumbsUp />
							</span>
							<span>
								<FaBookmark />
							</span>
						</Fragment>
					)}
				</div>
				<div className="social-section" style={{ margin: "20px 0px" }}>
					<span>
						<FaFacebook />
					</span>
					<span>
						<FaTwitter />
					</span>
					<span>
						<FaGithub />
					</span>
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
