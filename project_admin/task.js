var connection = require("../config/config");


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
        'start_date': req.body.start_date,
        'end_date': req.body.end_date,
        'estimated_time_second': req.body.estimated_time_second,
        'actual_time_second': req.body.actual_time_second,
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
                "code": 202,
                "message": "error occured",
                'error':err 

            })
        }
        else {
            res.send({
                'code': 400,
                "message": 'get the results as..',
                'data': result
            })
        }
    })
}



exports.project_task_view = (req, res) => {

    var query = `SELECT employee_id,project_name FROM project,project_team,project_task WHERE project.id= project_team.project_id AND project_team.project_id = project_task.project_id `
    connection.query(query, (err, result) => {
        console.log(err, "abdad")
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error': err
            })
        }
        else {
            console.log(result)
            res.send({
                'code': 400,
                "message": 'Project Task With Associated Employee',
                'data': result
            })
        }

    })


}

exports.project_task_priority=(req,res)=>{
   var query =`SELECT id,task_priority FROM project_task_priority `
   connection.query(query, (err, result) => {
    console.log(err, "abdad")
    if (err) {
        res.send({
            "code": 202,
            "message": "error occured",
            'error': err
        })
    }
    else {
        console.log(result)
        res.send({
            'code': 400,
            "message": 'Project Task With Associated Employee',
            'data': result
        })
    }

})

}


exports.project_task_status=(req,res)=>{
 var query =`SELECT id,task_status FROM project_task_status`
 connection.query(query, (err, result) => {
    console.log(err, "abdad")
    if (err) {
        res.send({
            "code": 202,
            "message": "error occured",
            'error': err
        })
    }
    else {
        console.log(result)
        res.send({
            'code': 400,
            "message": 'Project Task With Associated Employee',
            'data': result
        })
    }

})
}