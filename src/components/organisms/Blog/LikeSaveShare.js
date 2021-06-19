import React from "react";
import {
	FaBookmark,
	FaFacebook,
	FaGithub,
	FaThumbsUp,
	FaTwitter
} from "react-icons/fa";

function LikeSaveShare() {
	return (
		<div className="like-save-share-section">
			<div className="social-section" style={{ margin: "20px 0px" }}>
				<span>
					<FaThumbsUp />
				</span>
				<span>
					<FaBookmark />
				</span>
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
	);
}

export default LikeSaveShare;
