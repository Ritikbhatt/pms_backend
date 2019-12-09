var connection = require("../config/config")
var utils = require('../utils/utitlity')
// doubts ..
// exports.submitDsr = (req, res) => {
//     var date = new Date();
//     // var dsr = {
//     //     'employee_id': req.user.empID,
//     //     'dsr_date': utils.date(date),
//     //     'is_submit': req.body.is_submit,
//     //     'created_date': date,
//     //     'modified_date': date
//     // }
//     // var query1 = `INSERT  INTO  project_dsr SET ?`
//     // connection.query(query1, dsr, (err, dsr) => {
//     //     if (err) {
//     //         res.send({
//     //             "code": 404,
//     //             "message": "error occured",
//     //             'error': err

//     //         })
//     //     }
//     //     else {

//              var commen = req.body.comment;

//              console.log(commen,"riitk")
//            var comment = JSON.parse(commen)
//            console.log(comment[0],"monkeyMan")
//              var projec =  req.body.project_id;
//                   var  project = JSON.parse(projec)
//                   console.log(project[0])
//              var tas =  req.body.project_task_id;
//              var  task = JSON.parse(tas)
//          console.log(comment)

//             if (comment.length > 0) {

//                         for(let k=0;k<comment.length;k++){

//                      console.log("bdjsabdkjsabdkasdsabkdjbas",req.body.project_id)
//                     var obj = {
//                         'project_id': project[k],
//                         'project_task_id': task[k],
//                         'employee_id': req.user.empID,
//                         'project_dsr_id': dsr.insertId,
//                         'comment': comment[k],
//                         'created_date':date,
//                         'modified_date':date,
//                         'used_second': req.body.used_second,
//                         'is_active': req.body.is_active

//                     }
//                     var query = `INSERT  INTO project_comment SET ?`
//                     connection.query(query, obj, (err, results) => {
//                         console.log(err)
//                         if (err) {
//                             res.send({
//                                 "code": 404,
//                                 "message": "error occured",
//                                 'error': err

//                             })

//                         }
//                         else {
//                             var obj={
//                                 'project_task_status_id':req.body.project_task_status_id

//                             }
//                             console.log(task[k],"balaaabalbabal")
//                       var query = `UPDATE project_task SET ? WHERE project_task.id= '${task[k]}' `
//                       connection.query(query,obj, (err, result) => {

//                         if (err) {
//                             res.send({
//                                 "code": 404,
//                                 "message": "error occured",
//                                 'error': err

//                             })

//                         }
//                         else {
//                             res.send({
//                                 'code': 200,
//                                 "message": 'DSR inserted',
//                                 'data': result
//                             })
//                         }
//                     })

//                         }


//                     })

//                 }




//             }
//         }
//     })
// }



// Project,Task,DSR,Used Hr,TaskStatus

exports.getDsrById = (req, res) => {
    var query = `SELECT project_name,task_name,task_status,project.id AS projectID ,comment, project_task.id AS projectTaskID FROM project,project_task,project_task_status,project_team,project_comment  WHERE  project_task.project_id= project.id  AND project_team.project_id = project.id AND project_team.project_id= project_task.project_id AND project_team.employee_id = '${req.user.empID}'  AND project_task_status.id =project_task.project_task_status_id AND project_comment.project_id=project_task.project_id AND  project_team.employee_id=project_comment.employee_id AND project_task.project_id='${req.body.projectID}'`
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
                "message": 'dsr details by status.',
                'data': result
            })
        }
    })
}

// employee_id,project_name there details 
exports.getDsrList = (req, res) => {

    var query = `SELECT dsr_date,created_date,modified_date FROM project_dsr WHERE employee_id ="${req.user.empID}"`
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
                "message": 'DSR retrived success',
                'data': result
            })
        }
    })


}




//DSR Date,Submitted Date,	Modified Date

// get dsr by status completed vale jo h

exports.getDsrByStatus = (req, res) => {
    var query = `SELECT project_name,task_name,project.id AS projectID , project_task.id AS projectTaskID, project_task_status_id FROM project,project_task,project_task_status,project_team  WHERE  project_task.project_id= project.id  AND project_team.project_id = project.id AND project_team.project_id= project_task.project_id AND project_team.employee_id = '${req.user.empID}'  AND project_task_status.id =project_task.project_task_status_id AND project_task_status.id<=3 `
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
                "message": 'dsr details by status.',
                'data': result
            })
        }
    })

}



exports.submitDsr = (req, res) => {
    var date = new Date();
    var dsr = {
        'employee_id': req.user.empID,
        'dsr_date': utils.date(date),
        'is_submit': req.body.is_submit ? req.body.is_submit : 1,
        'created_date': date,
        'modified_date': date
    }
    var query1 = `INSERT  INTO  project_dsr SET ?`
    connection.query(query1, dsr, (err, dsr) => {
        if (err) {
            res.send({
                "code": 404,
                "message": "error occured",
                'error': err

            })
        }
        else {

            for (let i = 0; i < req.body.length; i++) {
                console.log(typeof (req.body), "ritikbhayy", req.body.length)

                var obj = {
                    'project_id': req.body[i].project_id,
                    'project_task_id': req.body[i].project_task_id,
                    'employee_id': req.user.empID,
                    'project_dsr_id': dsr.insertId,
                    'comment': req.body[i].comment,
                    'created_date': date,
                    'modified_date': date,
                    'used_second': req.body[i].used_second,
                    'is_active': req.body[i].is_active ? req.body[i].is_active : 1

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
                        var obj = {
                            'project_task_status_id': req.body[i].project_task_status_id

                        }

                        var query = `UPDATE project_task SET ? WHERE project_task.id= '${req.body[i].project_task_id}' `
                        connection.query(query, obj, (err, result) => {

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
                                    "message": 'DSR inserted',
                                    'data': result
                                })
                            }
                        })

                    }


                })

            }
        }

    })
}
