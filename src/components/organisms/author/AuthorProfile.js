/* eslint-disable no-lone-blocks */
import React, { Fragment, useState, useEffect } from "react";
import Button from "../../atoms/button";
import SelectBox from "../../atoms/selectBox";
import axios from "../../../config/axios"
import Swal from "sweetalert2";

const userId = "7c2313cb-4f15-49d1-a2e1-9f6c5f72862d"

function AuthorProfile() {
	const [activeBox, setActiveBox] = useState(-1);
	const [userData, setUserData] = useState(false);
	const [fullName, setFullName] = useState(false);
	useEffect(() => {
		axios.get("/users/" + userId).then(res => setUserData(res.data));
	}, []);

	useEffect(() => {
		if (userData) {
			setFullName(userData.fullName)
		}
	}, [userData])



	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// -----------------------------------------------------------------------------------------------

	const updateProfileTextField = (value, fieldName) => {
		var reqData = {};
		let enteredFieldValue = value;
		switch (fieldName) {
			case 'fullName':
				{
					reqData.fullName = enteredFieldValue
				}
				break;
			default:
				{

				}
		}

		axios.patch("/users/" + userId, reqData).then(res => {
			if (res.status === 204) {
				Swal.fire({ icon: 'success', title: capitalizeFirstLetter(fieldName) + " Updated Successfully!", timer: 2000 })
			}
			else {
				Swal.fire({ icon: 'warning', title: "Update Failed !", timer: 2000 })
			}
		})

	}
	// -----------------------------------------------------------------------------------------------

	return (
		<div className="columns is-mobile">
			<div className="author-profile column is-10 is-offset-1">
				<div className="form-control is-flex-desktop">
					<div className="field">
						<label className="label">Name</label>
						<div className="control">
							<input
								className="input"
								type="text"
								placeholder={userData ? userData.fullName : ''}
								disabled={activeBox !== 0}
								value={fullName ? fullName : ''}
								onChange={(e) => { setFullName(e.target.value) }}

							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 0 ? (
							<Fragment>
								<Button onClick={async (e) => {
									let res = await updateProfileTextField(fullName, 'fullName')
									console.log("&Res", res)
								}}>Save</Button>
								<Button type="light" onClick={(e) => {
									setActiveBox(-1)

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
							/>
							<div className="is-help">Max 160 character</div>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 1 ? (
							<Fragment>
								<Button>Save</Button>
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
							<SelectBox isMulti isDisabled={activeBox !== 2} />
							<div className="is-help">Max 3 interests</div>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 2 ? (
							<Fragment>
								<Button>Save</Button>
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
					<div className="field">
						<label className="label">Facebook</label>
						<div className="control">
							<input
								className="input"
								type="text"
								placeholder="Enter your facebook id"
								disabled={activeBox !== 4}
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 4 ? (
							<Fragment>
								<Button>Save</Button>
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
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 5 ? (
							<Fragment>
								<Button>Save</Button>
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
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 6 ? (
							<Fragment>
								<Button>Save</Button>
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
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 7 ? (
							<Fragment>
								<Button>Save</Button>
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
