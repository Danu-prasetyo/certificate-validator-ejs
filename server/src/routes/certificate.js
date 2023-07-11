const express = require("express");
const router = express.Router();

const certificateController = require("../controller/certificate");

router.get("/qrcode", certificateController.getQrCode);
router.get("/:id", certificateController.getCertificateById);
// router.get("/", certificateController.getCertificates);

module.exports = router;

