var express = require('express');
var router = express.Router();
var project = require("../project_admin/task.js");
var middleware = require("../middleware/middleware")
router.post("/addProjectTask", middleware.checkToken, project.add_project_task)
router.get("/projectTaskView", middleware.checkToken, project.project_task_view)
router.get("/projectTaskPriority", middleware.checkToken, project.project_task_priority)
router.get("/projectTaskStatus", middleware.checkToken, project.project_task_status)

module.exports = router;