var connection = require("../config/config")

var ip = require('ip');
let utils = require('../utils/utitlity')

// exports.attendanceUser = (req, res) => {
//     var date = new Date();

//     let in_time_initial = {
//         'employee_id': req.user.empID,
//         'attendance_date': date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate(),
//         'in_time': date,
//         'login_ip': ip.address(),
//         'out_time': date,
//         'logout_ip': ip.address(),
//         'total_time': x
//     }


//     var x = in_time_initial.out_time.getHours() - in_time_initial.in_time.getHours()

//     let in_time_initial2 = {
//         'employee_id': req.user.empID,
//         'attendance_date': date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
//         'in_time': date,
//         'login_ip': ip.address(),
//         'out_time': date,
//         'logout_ip': ip.address(),
//         'total_time': x
//         // time_diff: abc(in_time, out_time),
//     }

//     var login_query = `INSERT  INTO employee_attendance SET ?`
//     var logout_query = `UPDATE  employee_attendance SET ? WHERE employee_id='${req.user.empID}' AND DAY(attendance_date)=DAY(CURRENT_DATE()) AND  MONTH(attendance_date) = MONTH(CURRENT_DATE()) AND YEAR(attendance_date) = YEAR(CURRENT_DATE()) `

//     //let query = req.body.submitType == 'login'? login_query : logout_query; // Attendance login and logout queries
//     if (req.body.submitType == 'login') {
//         connection.query(login_query, in_time_initial2, (err, results) => {
//             console.log(err)
//             if (err) {
//                 console.log("error ocurred", err);
//                 res.send({
//                     "code": 400,
//                     "message": "Something went wrong.",
//                     "err": err
//                 })
//             } else {

//                 console.log('The solution is: ', results);
//                 res.send({
//                     "code": 200,
//                     "message": "Attendance submitted successfully.",
//                     "data": results
//                 });
//             }
//         })
//     }
//     else if (req.body.submitType == 'logout') {

//         connection.query(`SELECT in_time FROM employee_attendance WHERE  DAY(attendance_date)=DAY(CURRENT_DATE()) AND  MONTH(attendance_date) = MONTH(CURRENT_DATE()) AND YEAR(attendance_date) = YEAR(CURRENT_DATE())  AND  employee_id ='${req.user.empID}' `, (err, result) => {

//             if (err) {
//                 console.log("error ocurred", err);
//                 res.send({
//                     "code": 400,
//                     "message": "Something went wrong.",
//                     "err": err
//                 })
//             } else {
//      console.log(result,"ritik bhatt ji ")
//                 if (result.length > 0) {
//                     let j;
//                     let out_time = {
//                         'employee_id': req.user.empID,

//                         'out_time': date,
//                         'logout_ip': ip.address(),
//                         'total_time': j

//                     }

//                     var minutes1 = (result[0].in_time.getHours() * 60) + result[0].in_time.getMinutes();
//                     console.log(minutes1 + " Minutes");
//                     var minutes2 = (out_time.out_time.getHours() * 60) + out_time.out_time.getMinutes();
//                     console.log(minutes2 + " Minutes");


//                     var num = minutes2 - minutes1;
//                     var hours = (num / 60);
//                     var rhours = Math.floor(hours);
//                     var minutes = (hours - rhours) * 60;
//                     var rminutes = Math.round(minutes);
//                     var total_in_time = rhours + ":" + rminutes + ":" + 00;


//                     let in_time_obj = {
//                         'employee_id': req.user.empID,

//                         'out_time': date,
//                         'logout_ip': ip.address(),
//                         'total_time': total_in_time
//                         // time_diff: abc(in_time, out_time),
//                     }
//                     connection.query(logout_query, in_time_obj, (err, results) => {
//                         if (err) {
//                             console.log("error ocurred", err);
//                             res.send({
//                                 "code": 400,
//                                 "message": "Something went wrong.",
//                                 "err": err
//                             })
//                         } else {

//                             console.log('The solution is: ', results);
//                             res.send({
//                                 "code": 200,
//                                 "message": "Attendance login submitted.",
//                                 "data": results
//                             });
//                         }
//                     })

//                 } else {
//                     res.json({
//                         code: 200,
//                         message: 'User did not logged in.',
//                         data: null
//                     })
//                 }

//             }
//         })
//     }
// }




exports.attendanceUser = (req, res) => {
    var date = new Date();

    let in_time_initial = {
        'employee_id': req.user.empID,
        'attendance_date': date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
        'in_time': date,
        'login_ip': ip.address(),
        'out_time': date,
        'logout_ip': ip.address(),
        'total_time': x
    }


    var x = in_time_initial.out_time.getHours() - in_time_initial.in_time.getHours()

    let in_time_initial2 = {
        'employee_id': req.user.empID,
        'attendance_date': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
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
                let obj = { 'time': utils.time(in_time_initial.in_time), 'data': results }
                console.log('The solution is: ', utils.time(in_time_initial.in_time));
                res.send({
                    "code": 200,
                    "message": "Attendance submitted successfully.",
                    "data": obj
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
                console.log(result, "ritik bhatt ji ")
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

exports.checkTodaysAttendance = (req, res) => {
    let month = req.body.month ? req.body.month : new Date().getMonth() + 1;
    let year = req.body.year ? req.body.year : new Date().getFullYear();


    var query = `SELECT in_time,out_time,login_ip FROM employee_attendance WHERE employee_id='${req.user.empID}' AND DATE(attendance_date)=CURDATE()`
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
                "message": "Attendance List",
                "data": result
            })
        }

    })



}

exports.attendanceDetails =  (req, res) => {
    let data = [];

    let month = req.body.month ? req.body.month : new Date().getMonth() + 1;
    let year = req.body.year ? req.body.year : new Date().getFullYear();
    var dateMonth = new Date(year, month, 0).getDate();
    let bus = [];
    let resData = [];


    console.log("API executed")
    let query = `SELECT attendance_date,in_time,out_time,login_ip FROM employee_attendance WHERE employee_id='${req.user.empID}' `
    connection.query(query, async (err, result) => {
        console.log(err, "hsdbfdsbfkjbsdkjf",result && utils.date1(result[0].attendance_date),typeof utils.date1(result[0].attendance_date))
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error': err
            })
        }
        else {
            
            console.log(result,"rrrrr")

            for(let i = 0;i<dateMonth;i++){
                let resObje = {
                    attendace_date : i+1 +'-'+ month +'-'+ year,
                    in_time : '',
                    out_time : '',
                    total_time:'',
                    login_ip:''
                }
                 result.forEach((element,key)=>{
                     console.log(element &&  utils.date1(element.attendance_date),"==", i,"Check match",element)
                    if (element &&  utils.date1(element.attendance_date) == i){
                        console.log('push insiede')
                        let resObje1 = {
                            attendace_date : element.attendance_date,
                            in_time : element.in_time,
                            out_time : element.out_time,
                            total_time:element.total_time,
                            login_ip:element.login_ip
                        }
                        resData.push(resObje1);
                    }else{
                        if(!resData[i]){
                            resData.push(resObje);
                        }
                    }
                })
                
            }
            console.log(resData,"Response data",resData.length)




            res.send({
                "code": 200,
                "message": "attendance details",
                'data': resData

            })



        }


    })


}

// conn./qwery(result)
// let data = [];
// let resObject = {
//     attendance_date :'',
//     logged_in_time : ''
// }
// for(let i=0,i<days.length;i++){
//     if(month == new Date().getMonth() && year == new Date().getYear())

//     if(i > new Date.getDate()){
//     days[i] == result.date.getDayDate{
//         resObject = {
//             attendance_date : result[i].attendance_date,
//             attendance_day : result[i].attendace_date.getDay()
//             logged_in_time
//         }

//         data.push(resObject)
//     }else{

//         data.push(resObject)
//     }
//     else{
//         break;
//     }
// }