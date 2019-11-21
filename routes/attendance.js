
var express = require('express');
var router = express.Router();
var controller = require("../controllers/attendance")
var middleware = require("../middleware/middleware")


router.get('/attendanceUser',middleware.checkToken, controller.attendanceUser);

module.exports=router;