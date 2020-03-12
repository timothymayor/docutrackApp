var fetch = require("node-fetch");
var models = require('../models');

var async = require('async');

// Display document create form on GET.
exports.document_create_get = function(req, res, next) {
        // renders a document form
        models.Application.findAll().then(applications=>{
          models.Category.findAll().then(categories=>{
            models.Type.findAll().then(types=>{
              res.render('forms/document_form', { title: 'Create Document', applications, categories, types, layout: 'layouts/detail'});
              console.log("Document form renders successfully");
            })
          })
        })
};

// Handle document create on POST.
exports.document_create_post = async function( req, res, next) {
  
  const category = await models.Category.findById(req.body.category_id);
     
  if (!category) {
    return res.status(400);
  }
  
  const employee = await models.Employee.findById(req.body.employee_id);
  
  if (!employee) {
    return res.status(400);
   }
   
   const application = await models.Application.findById(req.body.application_id);
   
   if (!application) {
     return res.status(400);
   }
   
 //   // ok category exist
   console.log("This is the category subject we entered in front end " + category.title)
   
     const document = models.Document.create({
            subject: req.body.subject,
            description: req.body.description,
            status: req.body.status,
            TypeId: req.body.type_id,
            EmployeeId: req.body.employee_id,
            ApplicationId: req.body.application_id,
            CategoryId: req.body.category_id} 
     )
     
      // const document_category = {
        //   document_id: document.id,
        //   // application_id: application.id,
        //   // EmployeeId: employee.id,
        //   category_id: category.id
        // };
        
        // Create and save a document category
        //  const DocumentCategorySaved = await models.DocumentCategories.create(document_category);
        //  await document.addCategory(category);
        
    //  console.log("Document created successfully");
    //  // check if there was an error during document creation
    .then(document =>{
      
   console.log("The saved document is " + document.id);
      models.Comment.findAll({
        where: {
          DocumentId:document.id
        }
      })
    .then(comments=>{
    console.log("rendering document created successfully " +document.id);
        // res.render('pages/document_detail', { title: 'Create Document', document, comments, employee, layout: 'layouts/detail'});
        res.redirect('/doc/document/'+document.id);
      })
    })
    .catch(error => {
      console.log('There was an error');
      res.status(404).send(error);
    })
         
};

//  Promise.all([User.create(), City.create()])
//     .then(([user, city]) => UserCity.create({userId: user.id, cityId: city.id}))


// Display document delete form on GET.
exports.document_delete_get = function(req, res, next) {
       models.Document.destroy({
            // find the document_id to delete from database
            where: {
              id: req.params.document_id
            }
          }).then(function() {
           // If a document gets deleted successfully, we just redirect to documents list
           // no need to render a page
            res.redirect('/doc/documents');
            console.log("Document deleted successfully");
          });
};

// Handle document delete on POST.
exports.document_delete_post = function(req, res, next) {
          models.Document.destroy({
            // find the document_id to delete from database
            where: {
              id: req.params.document_id
            }
          }).then(document => {
           // If a document gets deleted successfully, we just redirect to documents list
           // no need to render a page
           res.redirect('/doc/documents');
          }).catch (error => {
            res.status(404).send(error);
        })
 };

// Display document update form on GET.
exports.document_update_get = function(req, res, next) {
        // Find the document you want to update
        console.log("ID is " + req.params.document_id);
        models.Document.findById(
                req.params.document_id
        ).then(function(document) {
          models.Application.findAll().then(applications=>{
            models.Category.findAll().then(categories=>{
              models.Type.findAll().then(types=>{
                // renders a post form
                console.log(categories)
                res.render('forms/document_form', { title: 'Update Document', document: document, applications, categories, types, layout: 'layouts/detail'});
                console.log("Post update get successful");
              })
            })
          })
        });
        
};

// Handle document update on POST.
exports.document_update_post = function(req, res, next) {
        console.log("ID is " + req.params.document_id);
        console.log("CategoryID is " + req.body.category_id);
        models.Document.update(
        // Values to update
            {
              subject: req.body.subject,
              description: req.body.description,
              status: req.body.status,
              TypeId: req.body.type_id,
              ApplicationId: req.body.application_id,
              CategoryId: req.body.category_id
            },
          { // Clause
                where: 
                {
                    id: req.params.document_id
                }
            }
        //   returning: true, where: {id: req.params.document_id} 
         ).then(// If a document gets updated successfully, we just redirect to documents list
                // no need to render a page
                document => {
                 console.log("rendering document updated successfully");
                 res.redirect('/doc/document/' + req.params.document_id);
                  }).catch (error => {
                    res.status(404).send(error);
                  })
                    // res.redirect('/doc/documents');
              };

// Handle document publish on get.
exports.document_publish_get = function(req, res, next) {
        console.log("ID is " + req.params.document_id);
        let document_id = req.params.document_id;
        let employee_id = req.params.employee_id;
        models.Document.update(
        // Values to update
            {
              status: 'Published'
            },
          { // Clause
                where: 
                {
                    id: req.params.document_id
                }
            }
        //   returning: true, where: {id: req.params.document_id} 
         ).then(// If a document gets updated successfully, we just redirect to documents list
                // no need to render a page
                document => {
                  if (employee_id){
                    res.redirect('/doc/employee/' + employee_id);
                  } else {
                    res.redirect('/doc/document/' + document_id);
                  }
                  }).catch (error => {
                    res.status(404).send(error);
                  })
                    // res.redirect('/doc/documents');
              };

// Handle document draft on get.
exports.document_draft_get = function(req, res, next) {
        console.log("ID is " + req.params.document_id);
        let document_id = req.params.document_id;
        let employee_id = req.params.employee_id;
        models.Document.update(
        // Values to update
            {
              status: 'Draft'
            },
          { // Clause
                where: 
                {
                    id: req.params.document_id
                }
            }
        //   returning: true, where: {id: req.params.document_id} 
         ).then(// If a document gets updated successfully, we just redirect to documents list
                // no need to render a page
                document => {
                  if (employee_id){
                    res.redirect('/doc/employee/' + employee_id);
                  } else {
                    res.redirect('/doc/document/' + document_id);
                  }
                  }).catch (error => {
                    res.status(404).send(error);
                  })
                    // res.redirect('/doc/documents');
              };

// Display detail page for a specific document.
exports.document_detail = function(req, res, next) {
        // find a document by the primary key Pk
        models.Document.findById(
                req.params.document_id                
        ).then(function(document) {
          models.Comment.findAll({
            where:{
              DocumentId:document.id
            }, 
            // include: [{
            //   model:models.Employee,
            //   as: 'commentEmployee'
            // }]
          }).then(function (comments){
          models.Employee.findById(document.EmployeeId).then(function (employee){
            models.Category.findById(document.CategoryId).then(function (category){
              models.Type.findById(document.TypeId).then(function (type){
        // renders an inividual document details page
        res.render('pages/document_detail', { title: 'Document Details', document: document, comments, employee, category, type, layout: 'layouts/detail'} );
        console.log("Document details renders successfully");
              });
             });
           });
          });
        });
};
 
// Display list of all documents.
exports.document_list = function(req, res, next) {
        // controller logic to display all documents
      // let documentListUrl = 'https://docutrack-api.herokuapp.com/doc/documents';
      // const documentList = async () => {
      //     try {
      //       let response = await fetch(documentListUrl, {
      //         headers: {
      //           Accept: "application/json",
      //           "Content-Type": "application/json"
      //         }
      //       });
      //       let result = await response.json();
      //       console.log(result);
            
      //       let { documents } = result;
        
      //       // render the page to display all applications
      //       console.log("rendering document list");
      //       res.render('pages/document_list', { title: 'Document List', documents:documents, layout: 'layouts/list'});
      //         } catch (err) {
      //           console.log(err);
      //         }
      //   };
        
      //   documentList();

      models.Document.findAll()
        .then(documents =>{
          models.Application.findAll().then(applications=>{
            models.Category.findAll().then(categories=>{
              models.Type.findAll().then(types=>{
                res.render('pages/document_list', { title: 'Document List', documents:documents, applications, categories, types, layout: 'layouts/list'});
              })
            })
          })
        })
        .catch (error =>{
          console.log("There was an error: " + error);
          res.status(404).send(error);
        });
        
};

// This is the app homepage.
exports.index = function(req, res) {
    

res.render('pages/index', {title: 'Homepage', layout: 'layouts/main'});
      
/*      
   // find the count of documents in database
      models.Document.findAndCountAll(
      ).then(function(documentCount)
      {
        models.Employee.findAndCountAll(
      ).then(function(employeeCount)
      {
        models.Comment.findAndCountAll(
      ).then(function(commentCount)
      {
        models.Category.findAndCountAll(
      ).then(function(categoryCount)
      {
        models.Type.findAndCountAll(
      ).then(function(typeCount)
      {
       
       
 
        // res.render('pages/index', {title: 'Homepage', documentCount: documentCount, employeeCount: employeeCount, commentCount: commentCount, categoryCount: categoryCount, typeCount: typeCount, layout: 'layouts/main'});
        
        // res.render('pages/index_list_sample', { title: 'Post Details', layout: 'layouts/list'});
        // res.render('pages/index_detail_sample', { page: 'Home' , title: 'Post Details', layout: 'layouts/detail'});

      });
      });
      });
      });
      });
       
*/      

    };

 