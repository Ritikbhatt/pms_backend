
var express = require('express');
var router = express.Router();
var controller = require("../controllers/attendance")
var middleware = require("../middleware/middleware")


router.post('/attendanceUser',middleware.checkToken, controller.attendanceUser);

router.post('/attendanceDetails',middleware.checkToken, controller.attendanceDetails);
module.exports=router;