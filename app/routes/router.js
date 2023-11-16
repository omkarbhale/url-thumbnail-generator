const express = require("express");
const {getURLThumbnail} = require("../controllers/controller.js");

const router = express.Router();
router.get("/", getURLThumbnail);

module.exports = router