import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css"; // ES6

export default function Editor() {
	const [value, setValue] = useState(null);
	return (
		<div className="App">
			<ReactQuill
				value={value}
				onChange={setValue}
				modules={modules}
				theme="bubble"
				placeholder="Add your story..."
			/>
		</div>
	);
}

const modules = {
	toolbar: [
		["bold", "italic", "underline", "strike"], // toggled buttons
		["blockquote", "code-block"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ script: "sub" }, { script: "super" }], // superscript/subscript
		[{ direction: "rtl" }], // text direction

		[{ size: ["small", false, "large", "huge"] }], // custom dropdown

		[{ align: [] }],
		["image"]
	]
};
