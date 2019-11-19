var connection = require("../config/config");

exports.AllCounts = function (req, res) {

    var query = `SELECT
  (SELECT COUNT(*) FROM employee WHERE status = 0) as totalEmployee, 
  (SELECT COUNT(*) FROM project_team WHERE project_team.employee_id = '${req.user.empID}') as totalProjects,
  (SELECT COUNT(*) FROM project_dsr WHERE project_dsr.employee_id = '${req.user.empID}') as totalDsr,
  (SELECT COUNT(*) FROM project_task WHERE project_task.project_id = 1) as totalTask`;
    // var query = 'SELECT count(*) as allEmployees,count(*) as totalProjects FROM  employee,project  WHERE '
    connection.query(query, (err, result) => {
        console.log(err)
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured"

            })
        }
        else {


            res.send({
                "code": 200,
                "message": "resulsy",
                "data": result
            })
        }
    })

}

exports.employee_attendance = function (req, res) {
    var query = (`SELECT in_time,out_time,total_time,attendance_date, FROM employee_attendance WHERE employee_attendance.employee_id ='${req.user.empID}'`)
    connection.query(query, (err, result) => {
        console.log(err)
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured"

            })
        }
        else {
            res.send({
                "code": 200,
                "message": "list of all holidays",
                "data": result
            })
        }
    })
}

exports.HolidaysList = function (req, res) {

    let array = [];
    var query = (`SELECT holiday_name,holiday_start_date,no_of_day,is_optional_leave FROM holiday`)
    connection.query(query, (err, result) => {
        console.log(err)
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured"

            })
        }
        else {
            for (let i = 0; i < result.length; i++) {
                if (result[i].is_optional_leave == 0) {
                    array.push(result[i])

                }
            }


var query =`SELECT COUNT(leave_days) as Applied,leave_type,yearly_allowed as Allowed FROM apply_leave,leave_type WHERE apply_leave.leave_type_id=leave_type.id AND apply_leave.employee_id='${req.user.empID}'`
            connection.query(query, (err, results) => {
   console.log(err)
                if (err) {
                    res.send({
                        "code": 202,
                        "message": "error occured"

                    })
                }


                else {

                    let data = { "holiday": result, "optional_leave": array ,"Allowed leave":results}
                    res.send({
                        "code": 200,
                        "message": "list of all holidays",
                        "data": data
                    })

                }
            })
        }
    })



}
exports.upcomingBirthDay = function (req, res) {

    var query = 'SELECT empFirstName,dob FROM employee '
    connection.query(query, (req, res) => {

        if (err) {
            res.send({
                "code": 202,
                "message": "error occured"

            })
        }
        else {
            res.send({
                "code": 200,
                "message": "list of all holidays",
                "data": result
            })
        }

    })

}


// exports.insert=(req,res)=>{
//   let date =new Date();
//     let obj= {
//     "holiday_name":req.body.holiday_name,
//     "holiday_start_date":req.body.holiday_start_date,
//     "no_of_day":req.body.no_of_day,
//     "is_optional_leave":req.body.is_optional_leave,
//     "created_date":date


//   }
//   connection.query('INSERT INTO holiday SET ?',obj,(err,result)=>{
//           console.log(err,"ritik") 
//     if (err) {
//         res.send({
//             "code": 202,
//             "message": "error occured"

//         })
//     }
//     else {
//         res.send({
//             "code": 200,
//             "message": "list of all holidays",
//             "data": result
//         })
//     }

//   })

// }