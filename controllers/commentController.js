var Comment = require('../models/category');
var models = require('../models');

// Display comment create form on GET.
exports.comment_create_get = function(req, res, next) {
        // create comment GET controller logic here 
        
        // renders a comment form
        res.render('forms/comment_form', { title: 'Create Comment', layout: 'layouts/detail'});
        
};

// Handle comment create on POST.
exports.comment_create_post = function(req, res, next) {
     models.Comment.create({
            title: req.body.title,
            description: req.body.description,
            DocumentId: req.body.document_id,
            EmployeeId: req.body.employee_id
        }).then(comment=> {
            models.Employee.findById(comment.EmployeeId)
                .then(employee=>{
        //   res.render('pages/document_detail', { title: 'Document Details', comment:comment, employee:employee, layout: 'layouts/detail'});
          res.redirect('/doc/document/'+comment.DocumentId);
      })
      }).catch(error=>{
          console.log("There was an error: " + error);
          res.status(404).send(error);
      });
};

// Display comment delete form on GET.
exports.comment_delete_get = function(req, res, next) {
        models.Comment.destroy({
            // find the comment_id to delete from database
            where: {
              id: req.params.comment_id
            }
          }).then(function() {
           // If an comment gets deleted successfully, we just redirect to posts list
           // no need to render a page
            res.redirect('/doc/comments');
            console.log("Comment deleted successfully");
          });};

// Handle comment delete on POST.
exports.comment_delete_post = function(req, res, next) {
          models.Comment.destroy({
            // find the comment_id to delete from database
            where: {
              id: req.params.comment_id
            }
          }).then(comment=> {
            res.json({
              success: "Comment deleted successfully"
            })
        }).catch(error=>{
            console.log("There was an error: " + error);
            res.status(404).send(error);
        });
};

// Display comment update form on GET.
exports.comment_update_get = function(req, res, next) {
        // Find the comment you want to update
        console.log("ID is " + req.params.comment_id);
        models.Comment.findById(
                req.params.comment_id
        ).then(function(comment) {
               // renders a comment form
               res.render('forms/comment_form', { title: 'Update Comment', comment: comment, layout: 'layouts/detail'});
               console.log("Comment update get successful");
          });
};

// Handle comment update on POST.
exports.comment_update_post = function(req, res, next) {
    console.log("ID is " + req.params.comment_id);
        models.Comment.update(
        // Values to update
            {
                title: req.body.title,
                description: req.body.description
            },
          { // Clause
                where: 
                {
                    id: req.params.comment_id
                }
            }
        //   returning: true, where: {id: req.params.comment_id} 
         ).then(comment=> {
          res.redirect('/doc/comments')
      }).catch(error=>{
          console.log("There was an error: " + error);
          res.status(404).send(error);
      });
};

// Display detail page for a specific comment.
exports.comment_detail = function(req, res, next) {
        // find a comment by the primary key Pk
        models.Comment.findById(
                req.params.comment_id
        ).then(comment=> {
          models.Employee.findById(comment.EmployeeId).then(function (employee){
          res.render('pages/comment_details', { title: 'Comment Details', comment:comment, employee, layout: 'layouts/detail'});
          });
      }).catch(error=>{
          console.log("There was an error: " + error);
          res.status(404).send(error);
      });
};

// Display list of all comments.
exports.comment_list = function(req, res, next) {
        // controller logic to display all comments
        models.Comment.findAll(
        ).then(comments=> {
          console.log("rendering comment list");
          res.render('pages/comment_list', { title: 'Comment List', comments:comments, layout: 'layouts/list'});
      }).catch(error=>{
          console.log("There was an error: " + error);
          res.status(404).send(error);
      });
};



 