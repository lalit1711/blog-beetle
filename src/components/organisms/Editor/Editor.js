import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // ES6

export default function Editor({ value, setValue }) {
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

const toolbarOptions = [
	["bold", "italic", "underline", "strike"], // toggled buttons
	["blockquote", "code-block"],
	[{ list: "ordered" }, { list: "bullet" }],
	[{ script: "sub" }, { script: "super" }], // superscript/subscript
	[{ direction: "rtl" }], // text direction

	[{ size: ["small", false, "large", "huge"] }], // custom dropdown

	[{ align: [] }],
	["link", "image"],
	[
		{
			color: [
				"#000000",
				"#e60000",
				"#ff9900",
				"#ffff00",
				"#008a00",
				"#0066cc",
				"#9933ff",
				"#ffffff",
				"#facccc",
				"#ffebcc",
				"#ffffcc",
				"#cce8cc",
				"#cce0f5",
				"#ebd6ff",
				"#bbbbbb",
				"#f06666",
				"#ffc266",
				"#ffff66",
				"#66b966",
				"#66a3e0",
				"#c285ff",
				"#888888",
				"#a10000",
				"#b26b00",
				"#b2b200",
				"#006100",
				"#0047b2",
				"#6b24b2",
				"#444444",
				"#5c0000",
				"#663d00",
				"#666600",
				"#003700",
				"#002966",
				"#3d1466"
			]
		}
	]
];

const modules = {
	toolbar: {
		container: toolbarOptions,
		handlers: {
			image: imageHandler
		}
	}
};

function imageHandler() {
	const tooltip = this.quill.theme.tooltip;
	const originalSave = tooltip.save;
	const originalHide = tooltip.hide;

	tooltip.save = function () {
		const range = this.quill.getSelection(true);
		const value = this.textbox.value;
		if (value) {
			this.quill.insertEmbed(range.index, "image", value, "user");
		}
	};
	// Called on hide and save.
	tooltip.hide = function () {
		tooltip.save = originalSave;
		tooltip.hide = originalHide;
		tooltip.hide();
	};
	tooltip.edit("image");
	tooltip.textbox.placeholder = "Embed URL";
}
