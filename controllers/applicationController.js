var fetch = require("node-fetch");
var Application = require('../models/application');
var models = require('../models');

// Display application create form on GET.
exports.application_create_get = function(req, res, next) {
        // create application GET controller logic here 
        
        // renders a application form
        res.render('forms/application_form', { title: 'Create Application',  layout: 'layouts/detail'});
        
};

// Handle application create on POST.
exports.application_create_post = function(req, res, next) {
     // create application POST controller logic here
     
     // If a application gets created successfully, we just redirect to applications list
     // no need to render a page
      models.Application.create({
            title: req.body.title ,
            description: req.body.description 
        }).then(application=> {
                console.log("rendering application created successfully");
                res.redirect('/doc/applications');
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display application delete form on GET.
exports.application_delete_get = function(req, res, next) {
        // GET logic to delete a application here
        
        models.application.destroy({
            // find the application_id to delete from database
            where: {
              id: req.params.application_id
            }
          }).then(function() {
           // If a application gets deleted successfully, we just redirect to applications list
           // no need to render a page
            res.redirect('/doc/applications');
            console.log("Application deleted successfully");
          });
        
};

// Handle application delete on POST.
exports.application_delete_post = function(req, res, next) {
   
        models.Application.destroy({
            // find the application_id to delete from database
            where: {
              id: req.params.application_id
            }
          }).then(application=> {
                console.log("rendering application delete");
                res.render('pages/:application_id', { title: 'Application Detail', application:application, layout: 'layouts/detail'});
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display application update form on GET.
exports.application_update_get = function(req, res, next) {
        console.log("ID is " + req.params.application_id);
        models.Application.findById(
                req.params.application_id
        ).then(function(application) {
               // renders a application form
               res.render('forms/application_form', { title: 'Update Application', application: application, layout: 'layouts/detail'});
               console.log("Application update get successful");
          });
};

// Handle application update on POST.
exports.application_update_post = function(req, res, next) {
        console.log("ID is " + req.params.application_id);
        models.Application.update(
        // Values to update
            {
              title: req.body.title ,
              description: req.body.description 
            },
          { // Clause
                where: 
                {
                    id: req.params.application_id
                }
            }
        //   returning: true, where: {id: req.params.application_id} 
         ).then(application=> {
                console.log("rendering application update");
                res.redirect('/doc/application/' + req.params.application_id);
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display detail page for a specific application.
exports.application_detail = function(req, res, next) {

        // find a application by the primary key Id
        models.Application.findById(
                req.params.application_id
        ).then(application=> {
            models.Document.findAll({
                where:{
                    ApplicationId: application.id
                }
            }).then(documents=> {
                console.log("rendering application detail");
                res.render('pages/application_detail', { title: 'Application Detail', application:application, documents, layout: 'layouts/detail'});
                })
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
        
};

// Display list of all applications.
exports.application_list = function(req, res, next) {
//     let applicationListUrl = 'https://docutrack-api.herokuapp.com/doc/applications';
//   const applicationList = async () => {
//   try {
//     let response = await fetch(applicationListUrl, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       }
//     });
//     let result = await response.json();
//     console.log(result);
    
//     let { applications } = result;

//     // render the page to display all applications
//     console.log("rendering application list");
//     res.render('pages/application_list', { title: 'Application List', applications:applications, layout: 'layouts/list'});
//   } catch (err) {
//     console.log(err)
//   }
// };

// applicationList();

    models.Application.findAll().then(applications =>{
          console.log("rendering application lists successfully");
          res.render('pages/application_list', { title: 'Application List', applications:applications, layout: 'layouts/list'});
        }).catch(error =>{
            console.log("There was an error: " + error);
            res.status(404).send(error);
        });
    
};

 