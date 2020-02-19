var connection = require("../config/config")


exports.allUsersList = function (req, res) {

    connection.query("SELECT empID,empFirstName,middle_name,empLastName,gender,martial_status,empemail,mobile_no,dob,doj FROM employee ORDER BY DATE(created_date) DESC ", function (err, result, fields) {
        if (err) {
            res.send({
                "code": 202,
                "message": "Something went wrong"

            })
        }
        else {

            res.send({
                "code": 200,
                "message": "List of Users",
                "data": result
            })
        }
    });

}

exports.singleUserlist = function (req, res) {


    connection.query("SELECT empID,empFirstName,middle_name,empLastName,gender,martial_status,empemail,mobile_no,dob,doj,employee_code,employee_type_id,employee_designation_id FROM employee  WHERE  empemail   = ?", [req.user.empemail], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "Something went wrong"
            })

        }
        else {
            res.send({
                "code": 200,
                "message": "List Of Users retrieved",
                "data": results
            })

        }



    })
}


exports.update = function (req, res) {

    connection.query("SELECT empID,empFirstName,middle_name,empLastName,gender,martial_status,empemail,mobile_no,dob,doj FROM employee  WHERE  empID = ?", [req.body.empID], function (error, resul, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "Something went wrong"
            })

        }

        else {

            let oldData = JSON.stringify(resul);
            var date = new Date();

            let obj = {
                empID: req.body.empID,
                empFirstName: req.body.empFirstName,
                middle_name: req.body.middle_name,
                empLastName: req.body.empLastName,
                gender: req.body.gender,
                martial_status: req.body.martial_status,
                empemail: req.body.empemail,
                password: req.body.password,
                mobile_no: req.body.mobile_no,
                dob: utils.date(req.body.dob),
                doj: utils.date(req.body.doj),
                created_date: date,

            }
            var x = JSON.stringify(obj)
            //   var res = x.replace(/:/g, "=");
            let newData = JSON.stringify(x);
            let queryer = `UPDATE employee SET ? WHERE empID = '${req.body.empID}'`;
            connection.query(queryer, obj, function (err, result) {

                if (err) {
                    res.send({
                        "code": 202,
                        "message": "Something went wrong",
                        "data": err

                    })
                }

                else {
                    connection.query("SELECT empID,empFirstName,middle_name,empLastName,gender,martial_status,empemail,mobile_no,dob,doj FROM employee  WHERE  empID = ?", [req.body.empID], function (error, result, fields) {
                        if (error) {
                     
                            res.send({
                                "code": 400,
                                "failed": "Something went wrong"
                            })

                        }

                        else {

                            let newOne = JSON.stringify(result);

                            if (oldData === newOne) {
                                res.send({
                                    "code": 202,
                                    "message": "Data Already exists"
                                })

                            }
                            else {
                                var today = new Date();
                                var user = {
                                    row_id: req.body.empID,
                                    updated_by_id: req.user.empID,
                                    table_name: "employee",
                                    old_data: oldData,
                                    new_data: newData,
                                    created_date: today,

                                }

                                connection.query('INSERT INTO history_management SET ?', user, function (error, results, fields) {

                           
                                    //  connection.query('INSERT INTO history_management SET ?',users,function(err,results){
                                    if (err) {
                                        console.log("error ocurred", err);
                                        res.send({
                                            "code": 400,
                                            "message": "Something went wrong",
                                            "err": error
                                        })
                                    } else {
                                
                                        res.send({
                                            "code": 200,
                                            "message": "User Updated sucessfully",
                                            "data": results
                                        });
                                    }

                                })


                            }
                        }
                    })
                }

            })

        }

    })

}

exports.getEmployeeDetails = function (req, res) {


    let query = "SELECT empID,employee_id,empFirstName,middle_name,empLastName,gender,martial_status,empemail,mobile_no,dob,doj,company_name,experience_from,experience_to,experience_technology,description  FROM employee,employee_experience WHERE employee.empID=employee_experience.employee_id "
    connection.query(query, function (err, results) {
        console.log(err, "here is the error")
      
        if (err) {
            console.log("error ocurred", err);
            res.send({
                "code": 400,
                "message": "error ocurred",
                "err": err
            })
        } else {
            let js = results[0].experience_technology;
            let rs = JSON.stringify(js)
       
            res.send({
                "code": 200,
                "message": "getting table data",
                "data": results
            });


        }


    })
}


exports.getSingleEmployeeDetails = function (req, res) {


    let query = "SELECT empID,employee_id,empFirstName,middle_name,empLastName,gender,martial_status,empemail,mobile_no,dob,doj,company_name,experience_from,experience_to,experience_technology,description  FROM employee,employee_experience WHERE employee.empID=employee_experience.employee_id "
    connection.query(query, function (err, results) {

        if (err) {
            res.send({
                "code": 400,
                "message": "Something went wrong",
                "err": err
            })
        } else {
            let js = results[0].experience_technology;
            let rs = JSON.stringify(js)
    
            res.send({
                "code": 200,
                "message": "getting table data",
                "data": results
            });


        }


    })
}


