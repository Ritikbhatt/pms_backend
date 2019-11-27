var connection = require("../config/config");


exports.add_project_task = (req, res) => {
    let date = new Date();
    var priority = {
        'task_priority': req.body.project_task_priority_id,
        'is_active': 1,
        'created_date': date,
        'modified_date': date
    }

    connection.query('INSERT INTO project_task_priority SET ?', priority, (err, priority) => {
        console.log(err, "ritik")
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured"

            })
        } else {
            var status = {
                task_status: req.body.project_task_status_id,
                is_active: req.body.is_active ? req.body.is_active : 1,
                can_edit: 1,
                created_date: date,
                modified_date: date

            }
            connection.query(`INSERT INTO project_task_status SET ?`, status, (err, status)=>{
                if (err) {
                    if (err) {
                        res.send({
                            "code": 202,
                            "message": "error occured"
            
                        })
                }
            }
                else {
                    let obj = {
                        'project_id': req.body.project_id ? req.body.project_id : 0,
                        'task_name': req.body.task_name ? req.body.task_name : '',
                        'task_description': req.body.task_description,
                        'module_id': req.body.module_id,
                        'project_task_priority_id': priority.insertId,
                        'project_task_status_id': status.insertId,
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
                                "message": "error occured"

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
            })
            
        }
    })
}


