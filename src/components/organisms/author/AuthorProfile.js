import React, { Fragment, useState } from "react";
import Button from "../../atoms/button";
import SelectBox from "../../atoms/selectBox";

function AuthorProfile() {
	const [activeBox, setActiveBox] = useState(-1);
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
								placeholder="Enter your name"
								disabled={activeBox !== 0}
							/>
						</div>
					</div>
					<div className="actions is-flex">
						{activeBox === 0 ? (
							<Fragment>
								<Button>Save</Button>
								<Button type="light" onClick={() => setActiveBox(-1)}>
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
