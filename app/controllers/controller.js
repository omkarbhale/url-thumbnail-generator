const path = require("path");
const fs = require("fs");

const URLThumbnail = require("../models/Thumnail.js");
const { generateThumbnail } = require("../services/services.js");

const getURLThumbnail = async (req, res, next) => {
	let { url, width, height } = req.query;
	if (!width && !height) {
		width = 1920 / 2;
		height = 1080 / 2;
	}

	if (!url) {
		// No url provided
		return res.status(404).json({ message: "No url provided" });
	}

	const existingUrlThumbnail = await URLThumbnail.findOne({
		url,
		width,
		height,
	});
	// Convert 24hrs to milliseconds
	const timer = 24 * 60 * 60 * 1000;
	if (
		existingUrlThumbnail != null &&
		existingUrlThumbnail.updatedAt > Date.now() - timer
	) {
		console.log(
			`Thumbnail already generated for ${url} at ${existingUrlThumbnail.updatedAt}`
		);
		return res.sendFile(
			path.join(
				__dirname,
				"..",
				"..",
				"images",
				`${existingUrlThumbnail.id}.jpg`
			)
		);
	}
	
	const _id = await generateThumbnail(url, parseInt(width), parseInt(height));

	if (!existingUrlThumbnail) {
		const urlThumbnail = new URLThumbnail({ id: _id, url, width, height });
		await urlThumbnail.save();
	} else {
		existingUrlThumbnail.id = _id;
		await existingUrlThumbnail.save();
	}

	res.sendFile(path.join(__dirname, "..", "..", "images", `${_id}.jpg`));
};

module.exports = { getURLThumbnail };
