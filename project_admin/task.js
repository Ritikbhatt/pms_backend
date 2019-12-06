var connection = require("../config/config");
let utils=require('../utils/utitlity')

exports.add_project_task = (req, res) => {
    let date = new Date();
 
    let obj = {
        'project_id': req.body.project_id ? req.body.project_id : 0,
        'task_name': req.body.task_name ? req.body.task_name : '',
        'task_description': req.body.task_description,
        'module_id': req.body.module_id,
        'project_task_priority_id': req.body.project_task_priority_id,
        'project_task_status_id': req.body.project_task_status_id,
        'percentage_complete': req.body.percentage_complete,
        'start_date': utils.date(req.body.start_date),
        'end_date': utils.date(req.body.end_date),
        'estimated_time_second': req.body.estimated_time_second,
        'actual_time_second': req.body.actual_time_second ?req.body.actual_time_second:req.body.estimated_time_second,
        'task_document': req.body.task_document,
        'created_date': date,
        'modified_date': date,
        'dsr_update_date': date,
        'is_active': req.body.is_active ? req.body.is_active : 1
    }


    connection.query('INSERT INTO project_task SET ?', obj, (err, result) => {
        console.log(err, "ritik")
        if (err) {
            res.send({
                "code": 404,
                "message": "error occured",
                'error': err

            })
        }
        else {
            res.send({
                'code': 200,
                "message": 'Task inserted sucessfully',
                'data': result
            })
        }
    })
}


exports.getEmployeeProjects = (req, res) => {

    var query = `SELECT project.id,project.project_name FROM project_team,project WHERE project_team.employee_id = '${req.user.empID}' AND project_team.project_id = project.id`
    connection.query(query, (err, result) => {
        console.log(err, "abdad")
        if (err) {
            res.send({
                "code": 404,
                "message": "error occured",
                'error': err
            })
        }
        else {
            console.log(result)
            res.send({
                'code': 200,
                "message": 'All Employee Projects retrieved.',
                'data': result
            })
        }

    })


}

exports.getProjectTaskPriority = (req, res) => {
    var query = `SELECT id,task_priority FROM project_task_priority `
    connection.query(query, (err, result) => {
        console.log(err, "abdad")
        if (err) {
            res.send({
                "code": 404,
                "message": "error occured",
                'error': err
            })
        }
        else {
            console.log(result)
            res.send({
                'code': 200,
                "message": 'Project Task With Associated Employee',
                'data': result
            })
        }

    })

}


exports.getProjectTaskStatus = (req, res) => {
    var query = `SELECT id,task_status FROM project_task_status`
    connection.query(query, (err, result) => {
        console.log(err, "abdad")
        if (err) {
            res.send({
                "code": 404,
                "message": "error occured",
                'error': err
            })
        }
        else {
            console.log(result)
            res.send({
                'code': 200,
                "message": 'project taskStatus',
                'data': result
            })
        }

    })
}


exports.getProjectModule = (req, res) => {
    var query = `SELECT id,project_module FROM project_module`
    connection.query(query, (err, result) => {
        console.log(err, "abdad")
        if (err) {
            res.send({
                "code": 404,
                "message": "error occured",
                'error': err
            })
        }
        else {
            console.log(result)
            res.send({
                'code': 200,
                "message": 'projectModule ',
                'data': result
            })
        }

    })
}