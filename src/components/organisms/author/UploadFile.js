import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { IMG_SRC } from "../../../constants/user";
import { IMAGE_URL } from "../../../config/axios";

const UploadFile = ({ userData, updateData, setUpdateData }) => {
	async function onChange(e) {
		const file = e.target.files[0];
		let formData = new FormData();
		formData.append("imgSrc", file);
		try {
			axios.patch("/users/updateMe", formData).then(res => {
				Swal.fire({
					icon: "success",
					timer: 2000,
					title: "Profile Pic Updated Successfully"
				}).then(res => {
					setUpdateData(!updateData);
				});
			});
		} catch (error) {
			console.log("Error uploading file: ", error);
		}
	}

	return (
		<div className="field">
			<label className="label">Photo</label>
			<div className="control">
				<div
					className="file is-small is-boxed user-profile-img"
					style={{
						background: `url(${IMAGE_URL + userData.imgSrc || IMG_SRC})`
					}}>
					<label className="file-label">
						<input
							className="file-input"
							type="file"
							name="resume"
							onChange={onChange}
						/>
						<span
							className="file-cta"
							style={{ background: "transparent", border: "none" }}>
							<span className="file-icon">
								<i className="fas fa-upload"></i>
							</span>
						</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default UploadFile;
