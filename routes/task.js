var express = require('express');
var router = express.Router();

var project= require("../project_admin/task.js");

var middleware = require("../middleware/middleware")

router.post("/add_project_task",middleware.checkToken,project.add_project_task)

module.exports= router;