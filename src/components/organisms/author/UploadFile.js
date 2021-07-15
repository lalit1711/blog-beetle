import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { IMG_SRC } from "../../../constants/user";

const UploadFile = ({ userData, updateData, setUpdateData }) => {
	async function onChange(e) {
		const file = e.target.files[0];
		try {
			let formData = new FormData();
			formData.append("sampleFile", file);
			let result = await axios.post(
				"http://3.7.98.9:5000/upload",
				formData,
				{}
			);
			if (result.data.status) {
				let fileLocation = result.data.fileData.Location;
				let bodyData = {
					imgSrc: fileLocation
				};
				let response = await axios.patch(
					"/users?where=" +
						encodeURIComponent(JSON.stringify({ id: userData.id })),
					bodyData
				);

				if (response.data.count > 0) {
					Swal.fire({
						icon: "success",
						timer: 2000,
						title: "Profile Pic Updated Successfully"
					}).then(res => {
						setUpdateData(!updateData);
					});
				}
			}
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
					style={{ background: `url(${userData.imgSrc || IMG_SRC})` }}>
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
