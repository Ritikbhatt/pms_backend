var express = require('express');
var router = express.Router();
var dsr = require("../controllers/dsr")
var middleware = require("../middleware/middleware")

router.post("/submitDsr", middleware.checkToken, dsr.submitDsr);
router.get("/getDsrList", middleware.checkToken, dsr.getDsrList);
router.get("/getDsrById", middleware.checkToken, dsr.getDsrById);

router.get("/getDsrByStatus", middleware.checkToken, dsr.getDsrByStatus);

module.exports = router;