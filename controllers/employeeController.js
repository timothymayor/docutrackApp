var Employee = require('../models/employee');
var models = require('../models');

// Display employee create form on GET.
exports.employee_create_get = function(req, res, next) {
        // create employee GET controller logic here 
        res.render('forms/employee_form', { title: 'Create Employee',  layout: 'layouts/detail'});
        
};

// Handle employee create on POST.
exports.employee_create_post = function(req, res, next) {
     // create employee POST controller logic here
     // If an employee gets created successfully, we just redirect to employees list
     // no need to render a page
      models.Employee.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            role: req.body.role,
            dob: req.body.dob,
            address: req.body.address,
            department: req.body.department,
            email: req.body.email
        }).then(employee=>{
          console.log("rendering employee created successfully");
          res.redirect('/doc/employee/' + employee.id);
        }).catch(error => {
          console.log('There was an error');
          res.status(404).send(error);
        });
};

// Display employee delete form on GET.
exports.employee_delete_get = function(req, res, next) {
          models.Employee.destroy({
             where: {
              id: req.params.employee_id
            }
          }).then(function() {
          
            res.redirect('/doc/employees');
            console.log("Employee deleted successfully");
          });
};

// Handle employee delete on POST.
exports.employee_delete_post = function(req, res, next) {
           models.Employee.destroy({
             where: {
              id: req.params.employee_id
            }
          }).then(() => res.json({
            success: 'Employee Deleted Successfully'
          })).catch(error => {
              res.status(404).send(error);
          })
};

// Display employee update form on GET.
exports.employee_update_get = function(req, res, next) {
        // Find the employee you want to update
        console.log("ID is " + req.params.employee_id);
        models.Employee.findById(
                req.params.employee_id
        ).then(function(employee) {
               // renders a post form
               res.render('forms/employee_form', { title: 'Update Employee', employee: employee, layout: 'layouts/detail'});
               console.log("Employee update get successful");
          });
};

exports.employee_update_post = function(req, res, next) {
        console.log("ID is " + req.params.employee_id);
        models.Employee.update(
        // Values to update
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                role: req.body.role,
                dob: req.body.dob,
                address: req.body.address,
                department: req.body.department,
                email: req.body.email
            },
          { // Clause
                where: 
                {
                    id: req.params.employee_id
                }
            }
          )
          models.Employee.findById( req.params.employee_id ).then(employee => {
            console.log("rendering employee updated successfully");
            console.log(employee);
          res.redirect('/doc/employee/'+employee.id+ '?message=Profile edit was successful!');
          }).catch(error => {
              console.log("There was an error: " + error);
              res.status(404).send(error);
          })
};

// Display list of all employees.
exports.employee_list = function(req, res, next) {
      
        models.Employee.findAll().then(employees =>{
          console.log("rendering employee lists successfully");
          res.render('pages/employee_list', { title: 'Employee List', employees:employees, layout: 'layouts/list'});
        }).catch(error =>{
            console.log("There was an error: " + error);
            res.status(404).send(error);
        });
};

// Display detail page for a specific employee.
exports.employee_detail = function(req, res, next) {
    // const documents = await models.Document.findAll();
    console.log('ID = '+req.params.employee_id)
         models.Employee.findById(
                 req.params.employee_id
        ).then(function (employee) {

          models.Document.findAll({
            where:{
              EmployeeId: employee.id
            }
          }).then(documents =>{
          console.log("rendering employee detail successfully");
        
          res.render('pages/employee_detail', { title: 'Employee Details', employee, documents, layout: 'layouts/detail'});
        });
        }).catch(error => {
            console.log("There was an error: " + error);
            res.status(404).send(error);
        })
};

 
 