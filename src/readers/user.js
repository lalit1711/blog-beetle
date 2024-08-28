import _property from "lodash/property";

const imgSrc = _property("imgSrc");
const id = _property("_id");
const fullName = _property("fullName");
const interests = _property("interests");
const bio = _property("bio");
const socialLinks = _property("socialLinks");

const UserReader = {
	id,
	imgSrc,
	fullName,
	interests,
	bio,
	socialLinks
};
export default UserReader;
