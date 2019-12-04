var connection = require("../config/config")


exports.submitDsr= (req,res)=>{

     var obj ={
        'project_id':req.body.project_id,
        'project_task_id':req.body.project_task_id,
        'employee_id':req.body.employee_id,
        'project_dsr_id' :req.body.project_dsr_id,
        'comment':req.body.comment,
        'created_date' :req.body,
        'modified_date':req.body,
        'is_active':req.body

     }
 var query=`INSERT project_id,project_task_id,employee_id,project_dsr_id,comment INTO project_comment` 
 connection.query(query,obj, (err, result) => {
 console.log(err)
 if (err) {
     res.send({
         "code": 202,
         "message": "error occured"

     })

 }
 else {
     res.send({
         'code': 400,
         "message": 'Client details',
         "data": result
     })
 }


})

}