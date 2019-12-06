var express = require('express');
var router = express.Router();
var project = require("../project_admin/task.js");
var middleware = require("../middleware/middleware")
router.post("/addProjectTask", middleware.checkToken, project.add_project_task)
router.get("/getProjectTaskPriority", middleware.checkToken, project.getProjectTaskPriority)
router.get("/getProjectTaskStatus", middleware.checkToken, project.getProjectTaskStatus)
router.get("/getEmployeeProjects", middleware.checkToken, project.getEmployeeProjects)
router.get("/getProjectModule", middleware.checkToken, project.getProjectModule)
module.exports = router;