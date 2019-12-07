var connection = require("../config/config")
var utils = require('../utils/utitlity')
// doubts ..
exports.submitDsr = (req, res) => {
    var date = new Date();
    var dsr = {
        'employee_id': req.user.empID,
        'dsr_date': utils.date(date),
        'is_submit': req.body.is_submit,
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
            var project = req.body.project_id;
            var projectID =   JSON.parse(project);
            var projectTask = req.body.projectTaskId;
            var  projectTaskId =JSON.parse(projectTask);
             var commen = req.body.comment;
             var comment =JSON.parse(commen);
        console.log("wjefbewjbf",typeof projectID )
            if (projectID.length > 0) {
                for (let i=0; i < projectID.length; i++) {
                    for(let j=0;j<projectTaskId.length;j++){
                        for(let k=0;k<comment.length;k++){
                            if(i==j&&j==k&&i==k){
                    var obj = {
                        'project_id': projectID[i],
                        'project_task_id': projectTaskId[j],
                        'employee_id': req.user.empID,
                        'project_dsr_id': dsr.insertId,
                        'comment': comment[k],
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

              }
              }
            }
            }
        }
    })
}





exports.getDsrById = (req, res) => {
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
// get dsr by status completed vale jo h

exports.getDsrByStatus =(req,res)=>{
  var query =`SELECT project_name,project.id,task_name,project_task.id FROM project_task,project,project_team,project_task_status WHERE project_task.project_id= project_team.project_id AND project_team.employee_id ='${req.user.empID}'AND project_task_status.id<=3 `
connection.query(query,(err,result)=>{
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

