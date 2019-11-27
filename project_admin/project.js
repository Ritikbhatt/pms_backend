var connection = require("../config/config");
var CodeGenerator = require('node-code-generator');
var generator = new CodeGenerator();
var pattern = 'A-###';
var howMany = 1;
var options = {};
// Generate an array of random unique project_code according to the provided pattern:
var project_code = generator.generateCodes(pattern, howMany, options);

exports.add_project = (req, res) => {
    let date = new Date();
    let status = {
        'project_status': req.body.project_status_id,
        'is_active': 1,
        'created_date': date,
        'modified_date': date
    }
    connection.query('INSERT INTO project_status SET ?', status, (err, status) => {
        if (err) {
            res.send({
                "code": 202,
                "message": "error occured",
                 'error':err 
            })
        } else {
            let billing = {
                'billing_method': req.body.project_billing_method_id,
                'is_active': req.body.is_active ? req.body.is_active : 1,
                'created_date': date,
                'modified_date': date
            }
            connection.query(`INSERT INTO project_billing_method SET ?`, billing, (err, billing) => {
                if (err) {
                    res.send({
                        "code": 202,
                        "message": "error occured",
                        'error':err 

                    })
                }
                else {
                  let priority={
                    'project_priority':req.body.project_priority_id,  
                    'is_active' : req.body.is_active?req.body.is_active:1,
                    'created_date' :date,
                    'modified_date': date 
                  }
                  connection.query(`INSERT INTO project_priority SET ?`,priority,(err,priority)=>{
                    if (err) {
                        res.send({
                            "code": 202,
                            "message": "error occured",
                            'error':err 
    
                        })
                    }
                    else{

                    var obj = {
                        'project_billing_method_id': billing.insertId,
                        'project_model': req.body.project_model,
                        'project_code': project_code,
                        'project_name': req.body.project_name,
                        'project_description': req.body.project_description,
                        'project_start_date': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                        'project_end_date': req.body.project_end_date,
                        'project_priority_id': priority.insertId,
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
                        console.log(err, "ritik")
                        if (err) {
                            res.send({
                                "code": 202,
                                "message": "error occured",
                                'error':err 

                            })
                        }
                        else {
                            var str = req.body.employee_id;
                            var temp = JSON.parse(str);
                            let data;
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
                                            res.send({
                                                "code": 202,
                                                "message": "error occured",
                                                'error':err 

                                            })
                                        } else {
                                            data = results
                                            console.log("Record Added")
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
                 })
                 }
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
                "message": "error occured"

            })

        }
        else {
            res.send({
                'code': 400,
                "message": 'get the results as..'
            })
        }
    })
}

exports.project_client_details = (req, res) => {

    connection.query(`SELECT client_name,id FROM project_client `, (err, result) => {
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

exports.project_billing_method = (req, res) => {
    let date = new Date();
    let obj = {
        'billing_method': req.body.billing_method,
        'created_date': date

    }
    connection.query(`INSERT INTO project_billing_method SET`, obj, (err, result) => {
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

exports.project_billing_method_details = (req, res) => {

    connection.query(`SELECT id,billing_method FROM project_billing_method `, obj, (err, result) => {
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
// not tested
exports.update_project = (req, res) => {

    let date = new Date();
    let status = {
        'project_status': req.body.project_status,
        'is_active': 1,
        'created_date': date,
        'modified_date': date
    }
    connection.query(`UPDATE  project_status SET ? WHERE id='${req.body.id}'`, status, (err, status) => {
        if (err) {
            res.send({
                'code': 202,
                'message': "you are getting error",

            })

        }
        else {

            var obj = {
                'project_billing_method_id': req.body.project_billing_method_id,
                'project_model': req.body.project_model,
                'project_code': project_code,
                'project_name': req.body.project_name,
                'project_description': req.body.project_description,
                'project_start_date': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
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

            connection.query(`UPDATE  project SET ? WHERE id='${req.body.id}`, obj, (err, result) => {
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
    })
}



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