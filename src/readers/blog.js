import _property from "lodash/property";

const authorId = _property("authorId");
const blogContent = _property("blogContent");
const coverImgSrc = _property("coverImgSrc");
const id = _property("id");
const title = _property("title");
const subTitle = _property("subTitle");
const categories = _property("categories");

const blog = {
	authorId,
	blogContent,
	coverImgSrc,
	id,
	title,
	subTitle,
	categories
};
export default blog;
