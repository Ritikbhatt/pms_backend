var express = require('express');
var router = express.Router();
var project = require("../project_admin/project.js");
var middleware = require("../middleware/middleware")
router.post("/add_project", middleware.checkToken, project.add_project)
router.post('/project_clients', middleware.checkToken, project.project_clients);
router.get('/get_client', middleware.checkToken, project.get_client);
router.get('/get_client_details', middleware.checkToken, project.get_client_details);
router.get('/get_assigned_project', middleware.checkToken, project.get_assigned_project);
router.post('/update_project', middleware.checkToken, project.update_project);
router.get('/listProject', middleware.checkToken, project.listProject);
router.get('/project_priority', middleware.checkToken, project.project_priority);
router.get('/project_status', middleware.checkToken, project.project_status);
router.get('/project_billing_method_details', middleware.checkToken, project.project_billing_method_details);
module.exports = router;