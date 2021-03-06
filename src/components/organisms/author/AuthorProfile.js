/* eslint-disable no-lone-blocks */
import React, { Fragment, useState, useEffect } from "react";
import Button from "../../atoms/button";
import SelectBox from "../../atoms/selectBox";
import axios from "../../../config/axios";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import UploadFile from "./UploadFile";

function AuthorProfile({ updateData, setUpdateData, authorInfo }) {
	const params = useParams();
	const userId = params.id;
	const [activeBox, setActiveBox] = useState(-1);
	const [userData, setUserData] = useState(false);
	const [fullName, setFullName] = useState(false);
	const [facebook, setFacebook] = useState(false);
	const [github, setGithub] = useState(false);
	const [twitter, setTwitter] = useState(false);
	const [linkedIn, setLinkedIn] = useState(false);
	const [bio, setBio] = useState(false);
	const [socialLinks, setSocialLinks] = useState("");
	const [interests, setInterests] = useState("");

	useEffect(() => {
		setUserData(authorInfo);
	}, [authorInfo]);

	useEffect(() => {
		if (userData) {
			setFullName(userData.fullName);
			if (userData.socialLinks !== "") {
				setSocialLinks(JSON.parse(userData.socialLinks));
			}
			setBio(userData.bio);
			if (userData.interests) {
				setInterests(userData.interests);
			}
		}
	}, [userData]);

	useEffect(() => {
		setFacebook(socialLinks.facebook ? socialLinks.facebook : "");
		setGithub(socialLinks.github ? socialLinks.github : "");
		setTwitter(socialLinks.twitter ? socialLinks.twitter : "");
		setLinkedIn(socialLinks.linkedIn ? socialLinks.linkedIn : "");
	}, [socialLinks]);

	useEffect(() => {}, [interests]);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// -----------------------------------------------------------------------------------------------

	const updateProfileTextField = (value, fieldName, socialLinkName) => {
		var reqData = {};
		let enteredFieldValue = value;
		switch (fieldName) {
			case "fullName":
				{
					reqData.fullName = enteredFieldValue;
				}
				break;
			case "socialLinks":
				{
					reqData.socialLinks = socialLinks;
					reqData.socialLinks[socialLinkName] = enteredFieldValue;
					reqData.socialLinks = JSON.stringify(reqData.socialLinks);
				}
				break;
			case "bio":
				{
					reqData.bio = enteredFieldValue;
				}
				break;
			case "interests":
				{
					reqData.interests = enteredFieldValue;
				}
				break;

			default: {
			}
		}

		axios
			.patch("/users/" + userId, reqData)
			.then(res => {
				if (res.status === 204) {
					Swal.fire({
						icon: "success",
						title: capitalizeFirstLetter(fieldName) + " Updated Successfully!",
						timer: 2000
					});
					setUpdateData(!updateData);
				} else {
					Swal.fire({ icon: "warning", title: "Update Failed !", timer: 2000 });
				}
			})
			.catch(err => {
				Swal.fire({ icon: "error", title: err.message, timer: 2000 });
			});
	};
	// -----------------------------------------------------------------------------------------------

	return (
		<div className="columns is-mobile">
			<div className="author-profile column ">
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">Name</label>
						<div className="control">
							<input
								className="input"
								type="text"
								placeholder={userData ? userData.fullName : ""}
								disabled={activeBox !== 0}
								value={fullName ? fullName : ""}
								onChange={e => {
									setFullName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 0 ? (
							<Fragment>
								<Button
									onClick={async e => {
										await updateProfileTextField(fullName, "fullName");
									}}>
									Save
								</Button>
								<Button
									type="light"
									onClick={e => {
										setActiveBox(-1);

										// updateProfileTextField(e, 'fullName')
									}}>
									Cancel
								</Button>
							</Fragment>
						) : (
							<Button type="dark" onClick={() => setActiveBox(0)}>
								Edit
							</Button>
						)}
					</div>
				</div>
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">Bio</label>
						<div className="control">
							<textarea
								className="textarea has-fixed-size"
								placeholder="Enter your bio"
								disabled={activeBox !== 1}
								onChange={e => {
									setBio(e.target.value);
								}}
								value={bio ? bio : ""}
							/>
							<div className="is-help">Max 160 character</div>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 1 ? (
							<Fragment>
								<Button
									onClick={() => {
										updateProfileTextField(bio, "bio");
									}}>
									Save
								</Button>
								<Button type="light" onClick={() => setActiveBox(-1)}>
									Cancel
								</Button>
							</Fragment>
						) : (
							<Button type="dark" onClick={() => setActiveBox(1)}>
								Edit
							</Button>
						)}
					</div>
				</div>
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">Interests</label>
						<div className="control">
							{interests ? (
								<SelectBox
									inputData={interests}
									setInterests={setInterests}
									isMulti
									isDisabled={activeBox !== 2}
								/>
							) : (
								""
							)}
							<div className="is-help">Max 3 interests</div>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 2 ? (
							<Fragment>
								<Button
									onClick={() => {
										updateProfileTextField(interests, "interests");
									}}>
									Save
								</Button>
								<Button type="light" onClick={() => setActiveBox(-1)}>
									Cancel
								</Button>
							</Fragment>
						) : (
							<Button type="dark" onClick={() => setActiveBox(2)}>
								Edit
							</Button>
						)}
					</div>
				</div>
				<div className="form-control is-flex-desktop">
					<UploadFile
						userData={userData}
						updateData={updateData}
						setUpdateData={setUpdateData}
					/>
				</div>
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">Facebook</label>
						<div className="control">
							<input
								className="input"
								type="text"
								placeholder="Enter your facebook id"
								disabled={activeBox !== 4}
								onChange={e => {
									setFacebook(e.target.value);
								}}
								value={facebook ? facebook : ""}
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 4 ? (
							<Fragment>
								<Button
									onClick={e => {
										updateProfileTextField(facebook, "socialLinks", "facebook");
									}}>
									Save
								</Button>
								<Button type="light" onClick={() => setActiveBox(-1)}>
									Cancel
								</Button>
							</Fragment>
						) : (
							<Button type="dark" onClick={() => setActiveBox(4)}>
								Edit
							</Button>
						)}
					</div>
				</div>
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">GitHub</label>
						<div className="control">
							<input
								className="input"
								type="text"
								placeholder="Enter your GitHub"
								disabled={activeBox !== 5}
								onChange={e => {
									setGithub(e.target.value);
								}}
								value={github ? github : ""}
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 5 ? (
							<Fragment>
								<Button
									onClick={() => {
										updateProfileTextField(github, "socialLinks", "github");
									}}>
									Save
								</Button>
								<Button type="light" onClick={() => setActiveBox(-1)}>
									Cancel
								</Button>
							</Fragment>
						) : (
							<Button type="dark" onClick={() => setActiveBox(5)}>
								Edit
							</Button>
						)}
					</div>
				</div>
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">Twitter</label>
						<div className="control">
							<input
								className="input"
								type="text"
								placeholder="Enter your Twitter"
								disabled={activeBox !== 6}
								onChange={e => {
									setTwitter(e.target.value);
								}}
								value={twitter ? twitter : ""}
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 6 ? (
							<Fragment>
								<Button
									onClick={e => {
										updateProfileTextField(twitter, "socialLinks", "twitter");
									}}>
									Save
								</Button>
								<Button type="light" onClick={() => setActiveBox(-1)}>
									Cancel
								</Button>
							</Fragment>
						) : (
							<Button type="dark" onClick={() => setActiveBox(6)}>
								Edit
							</Button>
						)}
					</div>
				</div>
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">Linkedin</label>
						<div className="control">
							<input
								className="input"
								type="text"
								placeholder="Enter your Linkedin"
								disabled={activeBox !== 7}
								onChange={e => {
									setLinkedIn(e.target.value);
								}}
								value={linkedIn ? linkedIn : ""}
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 7 ? (
							<Fragment>
								<Button
									onClick={e => {
										updateProfileTextField(linkedIn, "socialLinks", "linkedIn");
									}}>
									Save
								</Button>
								<Button type="light" onClick={() => setActiveBox(-1)}>
									Cancel
								</Button>
							</Fragment>
						) : (
							<Button type="dark" onClick={() => setActiveBox(7)}>
								Edit
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthorProfile;
