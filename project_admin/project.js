var connection = require("../config/config");
var CodeGenerator = require('node-code-generator');
var generator = new CodeGenerator();
var pattern = 'A-###';
var howMany = 1;
var options = {};
// Generate an array of random unique project_code according to the provided pattern:
var project_code = generator.generateCodes(pattern, howMany, options);




/**
 * descript : Add project function with transaction
 * created By : Sanjeev Gupta
 * date : 27th Nov 2019
 *
 */

/*
exports.add_project = (req,res) =>{
   let date = new Date();
   let status = {
       'project_status': req.body.project_status_id,
       'is_active': 1,
       'created_date': date,
       'modified_date': date
   }  */
/* Begin transaction */
/*
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query('INSERT INTO project_status SET ?', status, (err, status) => {
          if (err) {
            connection.rollback(function() {
              throw err;
            });
          }
          var obj = {
                'project_billing_method_id': req.body.project_billing_method_id,
                'project_model': req.body.project_model,
                'project_code': project_code,
                'project_name': req.body.project_name,
                'project_description': req.body.project_description,
                'project_start_date': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                'project_end_date': req.body.project_end_date,
                'project_priority_id': req.body.project_priority_id,
                'project_status_id': status.insertId,
                'percentage_complete': req.body.percentage_complete,
                'project_client_id': req.body.project_client_id,
                'risk_description': req.body.risk_description,
                'total_budgets': req.body.total_budgets,
                'reporting_to': req.body.reporting_to,
                'project_document': req.body.project_document,
                'created_date': date
            }
            connection.query('INSERT INTO project SET ?', obj, (err, result) => {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }
            var str = req.body.employee_id;
                    var temp = JSON.parse(str);
                    if (temp.length > 0) {
                        for (let i = 0; i < temp.length; i++) {
                            let empObj = {
                                'project_id': JSON.stringify(result.insertId),
                                'employee_id': temp[i],
                                'created_date': date,
                                'modified_date': date
                            }

                            connection.query(`INSERT INTO project_team SET ? `, empObj, (err, results) => {
                                console.log(err, "bhatt")
                                if (err) {
                                    connection.rollback(function() {
                                        throw err;
                                    });
                                    res.send({
                                        "code": 202,
                                        "message": "error occured"

                                    })
                                }


            connection.commit(function(err) {
              if (err) {
                connection.rollback(function() {
                  throw err;
                });
              }
              res.send({
                    "code": 200,
                    "message": "Project added successfully.",
                    "data": result
                })
              console.log('Transaction Complete.');
              connection.end();
                });
            })
            }
            }
          });
        });
      });
}
 */



exports.add_project = (req, res) => {
    var obj = {

        'project_billing_method_id': req.body.project_billing_method_id,
        'project_model': req.body.project_model,
        'project_code': req.body.project_code,
        'project_name': req.body.project_name,
        'project_description': req.body.project_description,
        'project_start_date': req.body.project_start_date,
        'project_end_date': req.body.project_end_date,
        'project_priority_id': req.body.project_priority_id,
        'project_status_id': req.body.project_status_id,
        'percentage_complete': req.body.percentage_complete,
        'project_client_id': req.body.project_client_id,
        'risk_description': req.body.risk_description,
        'total_budgets': req.body.total_budgets,
        'reporting_to': req.body.reporting_to,
        'project_document': req.body.project_document,
        'created_date': date
    }

    connection.query('INSERT INTO project SET ?', obj, (err, result) => {
        console.log(err, "ritik")
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error': err

            })
        }
        else {
            var str = req.body.employee_id;
            console.log(str)
            var temp = JSON.parse(str);
            let data;
            if (temp.length > 0) {
                for (let i = 0; i < temp.length; i++) {
                    let empObj = {
                        'project_id': result.insertId,
                        'employee_id': temp[i],
                        'created_date': date,
                        'modified_date': date
                    }

                    connection.query(`INSERT INTO project_team SET ? `, empObj, (err, results) => {
                        console.log(err, "bhatt")
                        if (err) {
                            res.send({
                                "code": 202,
                                "message": "error occured",
                                'error': err

                            })
                        } else {
                            data = results
                            console.log("project team Record Added")
                        }

                    })
                }
                res.send({
                    "code": 200,
                    "message": "Project added successfully.",
                    "data": result
                })
            }
            else {
                res.send({
                    "code": 400,
                    "message": result
                })
                //  connection.query(`SELECT `)
            }

        }
    })

}



exports.project_billing_method_details = (req, res) => {

    connection.query(`SELECT id,billing_method FROM project_billing_method `, (err, result) => {
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
                "message": 'Billing Details ',
                "data": result
            })
        }


    })
}


exports.project_status = (req, res) => {

    connection.query(`SELECT id,project_status FROM project_status`, (err, result) => {
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
                "message": 'data we get as..',
                "data": result
            })
        }


    })
}


exports.project_priority = (req, res) => {

    connection.query(`SELECT id,project_priority FROM project_priority `, (err, result) => {
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
                "message": 'data we get as..',
                "data": result
            })
        }


    })
}


exports.update_project = (req, res) => {

    let date = new Date();

    var obj = {
        'project_billing_method_id': req.body.project_billing_method_id,
        'project_model': req.body.project_model,
        'project_code': project_code,
        'project_name': req.body.project_name,
        'project_description': req.body.project_description,
        'project_start_date': req.body.project_start_date,
        'project_end_date': req.body.project_end_date,
        'project_priority_id': req.body.project_priority_id,
        'project_status_id': req.body.project_status_id,
        'percentage_complete': req.body.percentage_complete,
        'project_client_id': req.body.project_client_id,
        'risk_description': req.body.risk_description,
        'total_budgets': req.body.total_budgets,
        'reporting_to': req.body.reporting_to,
        'project_document': req.body.project_document,
        'modified_date': date
    }

    connection.query(`UPDATE  project SET ? WHERE id ='${req.body.id}'`, obj, (err, result) => {
        console.log(err, "ritik")
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error': err

            })
        }
        else {
            var str = req.body.employee_id;
            var temp = JSON.parse(str);
            let data;
            if (temp.length > 0) {
                for (let i = 0; i < temp.length; i++) {
                    let empObj = {

                        'employee_id': temp[i],
                        'modified_date': date
                    }
                    connection.query(`UPDATE project_team SET ? WHERE  project_id ='${req.body.project_id}'`, empObj, (err, results) => {
                        console.log(err, "bhatt")
                        if (err) {
                            res.send({
                                "code": 202,
                                "message": "error occured",
                                'error': err

                            })
                        } else {
                            data = results
                            console.log("Record Added")
                        }

                    })
                }
                res.send({
                    "code": 200,
                    "message": "employee updated sucessfully",
                    "data": result
                })
            }
            else {
                res.send({
                    "code": 400,
                    'message': 'Project updated successfully.',
                    "data": result
                })
                //  connection.query(`SELECT `)
            }

        }
    })
}

exports.listProject = (req, res) => {

    var query = `SELECT employee_id,project_name,empFirstName FROM project,project_team,employee WHERE project.id= project_team.project_id AND project_team.employee_id = employee.empID AND employee.empID='${req.user.empID}' `
    connection.query(query, (err, result) => {
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error':err 

            })

        }
        else {
            res.send({
                'code': 400,
                "message": 'project details retrived success',
                'data': result
            })
        }

    })


}


exports.project_clients = (req, res) => {
    let date = new Date();
    let obj = {
        'client_name': req.body.client_name,
        'client_email': req.body.client_email,
        'mobile_number': req.body.mobile_number,
        'landline_no': req.body.landline_no,
        'project_client_type_id': req.body.project_client_type_id,
        'client_location': req.body.client_location,
        'country_name': req.body.country_name,
        'start_date': req.body.start_date,
        'end_date': req.body.end_date,
        'client_url': req.body.client_url,
        'employee_designation_id': req.body.employee_designation_id,
        'created_date': date,
        'modified_date': date
    }

    connection.query(`INSERT INTO project_client SET ?`, obj, (err, result) => {

        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error':err 

            })

        }
        else {
            res.send({
                'code': 400,
                "message": 'Client details inserted'
            })
        }
    })
}

exports.get_client = (req, res) => {

    connection.query(`SELECT client_name,id FROM project_client `, (err, result) => {
        console.log(err)
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error':err 
            })

        }
        else {
            res.send({
                'code': 400,
                "message": 'ALl Client details',
                "data": result
            })
        }


    })
}

// for admin
exports.get_client_details = (req, res) => {

    connection.query(`SELECT * FROM project_client `, (err, result) => {
        console.log(err)
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error':err                 
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

exports.get_assigned_project = (req, res) => {

    connection.query(`SELECT project_name,employee_id FROM project,project_team,employee WHERE project_team.project_id= project.id AND project_team.employee_id= employee.empID AND emp_ID ='${req.user.empID}' `, (err, result) => {
        console.log(err)
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                'error':err 
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
