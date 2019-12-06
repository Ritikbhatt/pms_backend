var connection = require("../config/config")

// doubts ..
exports.submitDsr = (req, res) => {
    var date = new Date();
    var dsr = {
        'employee_id': req.user.empID,
        'dsr_date': date,
        'is_submit': req.body.is_submit,
        'created_date': date,
        'modified_date': date
    }
    // connection.query(`SELECT project_task_status_id FROM project_task where project_id ="${req.body.project_id}"`, (err, result) => {

    //     if (err) {
    //         res.send({
    //             "code": 404,
    //             "message": "error occured",
    //             'error': err

    //         })
    //     }

    //     else {

       //     console.log("hello dude", result[0].project_task_status_id)
     //       if (result[0].project_task_status_id == 1 || result[0].project_task_status_id == 2 || result[0].project_task_status_id == 3) {
                console.log("not hello dude")

                var query1 = ` INSERT  INTO  project_dsr SET ?`

                connection.query(query1, dsr, (err, dsr) => {

                    if (err) {
                        res.send({
                            "code": 404,
                            "message": "error occured",
                            'error': err

                        })
                    }
                    else {
                        var obj = {
                            'project_id': req.body.project_id,
                            'project_task_id': req.body.project_task_id,
                            'employee_id': req.user.empID,
                            'project_dsr_id': dsr.insertId,
                            'comment': req.body.comment,
                            'created_date': date,
                            'modified_date': date,
                            'used_second': req.body.used_second,
                            'is_active': req.body.is_active

                        }
                        var query = `INSERT  INTO project_comment SET ?`
                        connection.query(query, obj, (err, results) => {
                            console.log(err)
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
                                    "message": 'Client details',
                                    "data": results
                                })
                            }


                        })
                    }

                })
            }
            // else {
            //     res.send({
            //         "code": 404,
            //         "message": "cannot send dsr"
            //     })
            // }
        




exports.getDsrById = (req, res) => {
    connection.query(`SELECT dsr_date,created_date,modified_date FROM project_dsr WHERE employee_id ="${req.user.empID}"`)

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
            "message": 'DSR retrived success',
            'data': result
        })
    }
}

// employee_id,project_name there details 
exports.getDsrList = (req, res) => {

    var query = `SELECT employee_id,project_name FROM project,project_team,employee WHERE project.id= project_team.project_id AND project_team.employee_id = employee.empID AND employee.empID='1' `
    connection.query(query, (err, result) => {
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
                "message": 'Employee Projects',
                'data': result
            })
        }

    })


}

// Project,Task,DSR,Used Hr,TaskStatus
exports.getDsrById = (req, res) => {

    var query = `select project_name,task_name,comment,used_second from project_comment,project,project_task where  project.id ="${req.body.project_id}"`

    connection.query(query, (err, result) => {
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
                "message": 'dsr details retrived success',
                'data': result
            })
        }
    })
}

//DSR Date,Submitted Date,	Modified Date
exports.getDsrDates = (req, res) => {

    connection.query(`select dsr_date,created_date,modified_date  from project_dsr where employee_id ="${req.user.empID}"`, (err, result) => {

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
                "message": 'dsr details ',
                'data': result
            })
        }
    })
}