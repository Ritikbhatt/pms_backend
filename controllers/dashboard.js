var connection = require("../config/config")
var utils = require('../utils/utitlity')

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
                "message": "All Counts",
                "data": result
            })
        }
    })

}
let total = 0;
exports.employee_attendance = function (req, res) {
    var date = new Date()
    var query = (`SELECT  total_time,attendance_date FROM employee_attendance WHERE employee_attendance.employee_id ='${req.user.empID}'   AND MONTH(attendance_date) =  MONTH(CURRENT_DATE()) AND  YEAR(attendance_date) = YEAR(CURRENT_DATE())`)

    connection.query(query, (err, result) => {

        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error': err
            })
        }
        else {
            var array = [];
            for (var i = 0; i < result.length; i++) {

                //   console.log(result[i].total_time, "idbasibdbas")

                array.push(result[i].total_time)

            }
            var hour = 0;
            var minute = 0;
            var second = 0;
            //     console.log(array, "jdbwkbdkbwkdbkwdj")
            for (let j = 0; j < array.length; j++) {
                splitTime1 = array[j].split(':');


                hour += parseInt(splitTime1[0])

                minute += parseInt(splitTime1[1])
                hour = hour + parseInt(minute / 60);
                minute = minute % 60;


            }
            var sanjeev = hour + ':' + minute + ':' + 00
            var averageMonthTime = hour / result.length;
            let obj = { "yesterday_attendance": sanjeev, "monthly_average": averageMonthTime }
            res.send({
                "code": 200,
                "message": "list of all holidays",
                "data": obj
            })

        }

    })
}

exports.HolidaysList = function (req, res) {

    let array = [];
    var query = (`SELECT holiday_name,holiday_start_date,no_of_day,is_optional_leave FROM holiday ORDER BY DATE(holiday_start_date) ASC`)
    connection.query(query, (err, result) => {
        console.log(err)
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error': err
            })
        }
        else {
            for (let i = 0; i < result.length; i++) {
                if (result[i].is_optional_leave == 0) {
                    array.push(result[i])

                }
            }

            var query = ` SELECT  leave_type,
Sum(leave_days) as 'no_of_days'
FROM apply_leave as A ,leave_type as L  
WHERE A.leave_type_id = L.id AND A.employee_id = 17  AND YEAR(A.created_date) = YEAR(CURRENT_DATE())
group by L.id `


            connection.query(query, (err, results) => {
                console.log(err)
                if (err) {
                    res.send({
                        "code": 202,
                        "message": "error occured",
                        'error': err
                    })
                }


                else {

                    let data = {"holiday": result, "optional_leave": array, "Allowed leave": results}
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

    var query = `
    select * from (
        select empID,empFirstName,dob,gender,  datediff(DATE_FORMAT(dob,concat('%',YEAR(CURDATE()),'-%m-%d')),NOW()) as no_of_days from employee
    union
        select empID,empFirstName,dob,gender, 
        datediff(DATE_FORMAT(dob,concat('%',(YEAR(CURDATE())+1),'-%m-%d')),NOW()) as no_of_days from employee
    ) AS upcomingbirthday
    WHERE no_of_days>0 
    GROUP BY empID 
    ORDER BY no_of_days asc
    LIMIT 4`
    connection.query(query, (err, result) => {
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error': err
            })
        }
        else {
            res.send({
                "code": 200,
                "message": "Upcoming Birthday List",
                "data": result
            })
        }

    })

}

