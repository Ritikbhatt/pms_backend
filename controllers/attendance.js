var connection = require("../config/config")

var ip = require('ip');


exports.attendanceUser = (req, res) => {
    var date = new Date();

    let in_time_initial = {
        'employee_id': req.user.empID,
        'attendance_date': date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate(),
        'in_time': date,
        'login_ip': ip.address(),
        'out_time': date,
        'logout_ip': ip.address(),
        'total_time': x
    }


    var x = in_time_initial.out_time.getHours() - in_time_initial.in_time.getHours()

    let in_time_initial2 = {
        'employee_id': req.user.empID,
        'attendance_date': date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
        'in_time': date,
        'login_ip': ip.address(),
        'out_time': date,
        'logout_ip': ip.address(),
        'total_time': x
        // time_diff: abc(in_time, out_time),
    }

    var login_query = `INSERT  INTO employee_attendance SET ?`
    var logout_query = `UPDATE  employee_attendance SET ? WHERE employee_id='${req.user.empID}' AND DAY(attendance_date)=DAY(CURRENT_DATE()) AND  MONTH(attendance_date) = MONTH(CURRENT_DATE()) AND YEAR(attendance_date) = YEAR(CURRENT_DATE()) `

    //let query = req.body.submitType == 'login'? login_query : logout_query; // Attendance login and logout queries
    if (req.body.submitType == 'login') {
        connection.query(login_query, in_time_initial2, (err, results) => {
            console.log(err)
            if (err) {
                console.log("error ocurred", err);
                res.send({
                    "code": 400,
                    "message": "Something went wrong.",
                    "err": err
                })
            } else {

                console.log('The solution is: ', results);
                res.send({
                    "code": 200,
                    "message": "Attendance submitted successfully.",
                    "data": results
                });
            }
        })
    }
    else if (req.body.submitType == 'logout') {

        connection.query(`SELECT in_time FROM employee_attendance WHERE  DAY(attendance_date)=DAY(CURRENT_DATE()) AND  MONTH(attendance_date) = MONTH(CURRENT_DATE()) AND YEAR(attendance_date) = YEAR(CURRENT_DATE())  AND  employee_id ='${req.user.empID}' `, (err, result) => {

            if (err) {
                console.log("error ocurred", err);
                res.send({
                    "code": 400,
                    "message": "Something went wrong.",
                    "err": err
                })
            } else {
     console.log(result,"ritik bhatt ji ")
                if (result.length > 0) {
                    let j;
                    let out_time = {
                        'employee_id': req.user.empID,

                        'out_time': date,
                        'logout_ip': ip.address(),
                        'total_time': j

                    }

                    var minutes1 = (result[0].in_time.getHours() * 60) + result[0].in_time.getMinutes();
                    console.log(minutes1 + " Minutes");
                    var minutes2 = (out_time.out_time.getHours() * 60) + out_time.out_time.getMinutes();
                    console.log(minutes2 + " Minutes");


                    var num = minutes2 - minutes1;
                    var hours = (num / 60);
                    var rhours = Math.floor(hours);
                    var minutes = (hours - rhours) * 60;
                    var rminutes = Math.round(minutes);
                    var total_in_time = rhours + ":" + rminutes + ":" + 00;


                    let in_time_obj = {
                        'employee_id': req.user.empID,

                        'out_time': date,
                        'logout_ip': ip.address(),
                        'total_time': total_in_time
                        // time_diff: abc(in_time, out_time),
                    }
                    connection.query(logout_query, in_time_obj, (err, results) => {
                        if (err) {
                            console.log("error ocurred", err);
                            res.send({
                                "code": 400,
                                "message": "Something went wrong.",
                                "err": err
                            })
                        } else {

                            console.log('The solution is: ', results);
                            res.send({
                                "code": 200,
                                "message": "Attendance login submitted.",
                                "data": results
                            });
                        }
                    })

                } else {
                    res.json({
                        code: 200,
                        message: 'User did not logged in.',
                        data: null
                    })
                }

            }
        })
    }
}

