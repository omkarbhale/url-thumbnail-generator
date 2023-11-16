const mongoose = require("mongoose");

const URLThumbnailSchema = mongoose.Schema(
	{
		id: { type: String, required: true },
		url: {
			type: String,
			required: true,
		},
		width: {
			type: Number,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("URLThumbnail", URLThumbnailSchema);
