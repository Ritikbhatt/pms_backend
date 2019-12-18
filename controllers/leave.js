var connection = require("../config/config")
var utils = require('../utils/utitlity')


exports.applyLeave = (req,res)=>{
   let date =new Date();
 let obj ={
    'employee_id':req.user.empID,
    'leave_type_id':req.body.leave_type_id,
    'approver_employee_id':req.body.approver_employee_id,
    'leave_reason' :req.body.leave_reason,
    'contact_number':req.body.contact_number,
    'leave_to_date':utils.date(req.body.leave_to_date)?utils.date(req.body.leave_to_date):utils.date(date),
    'leave_from_date' :utils.date(req.body.leave_from_date)?utils.date(req.body.leave_from_date):utils.date(date),
    'approval_status':req.body.approval_status?req.body.approval_status:'Applied',
    'approved_employee_id':req.body.approved_employee_id,
    'leave_days' :req.body.leave_days,
    'created_date' :date,
    'modified_date' :date
 }
var query =`INSERT INTO apply_leave SET ?`
 connection.query(query,obj,(err, result) => {

    if (err) {
        res.send({
            "code": 404,
            "message": "Something went wrong",
            'error': err

        })

    }
    else {
        res.send({
            'code': 200,
            "message": 'leave details submitted success',
            'data': result
        })
    }
})

}



exports.getLeaveType = (req,res)=>{
  
    var query = `SELECT id,leave_type,one_time_allowed FROM leave_type`
    connection.query(query, (err, result) => {

        if (err) {
            res.send({
                "code": 404,
                "message": "Something went wrong",
                'error': err

            })

        }
        else {
            res.send({
                'code': 200,
                "message": 'leave type retreived success',
                'data': result
            })
        }
    })


}

// year ,leavetype ,No of Day ,leavedate ,approver , approvestatus , reason , apply date , operation

// exports.