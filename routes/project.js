var express = require('express');
var router = express.Router();

var project= require("../project_admin/project.js");

var middleware = require("../middleware/middleware")

router.post("/add_project",middleware.checkToken,project.add_project)
router.post('/project_clients',middleware.checkToken,project.project_clients);

router.post('/project_client_details',middleware.checkToken,project.project_client_details);
module.exports= router;