import _property from "lodash/property";

const imgSrc = _property("imgSrc");
const id = _property("id");
const fullName = _property("fullName");
const interests = _property("interests");
const bio = _property("bio");
const socialLinks = _property("socialLinks");

export default {
	id,
	imgSrc,
	fullName,
	interests,
	bio,
	socialLinks
};
