var Category = require('../models/category');
var models = require('../models');

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
        // create category GET controller logic here 
        
        // renders a category form
        res.render('forms/category_form', { title: 'Create Category',  layout: 'layouts/detail'});
        
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
     // create category POST controller logic here
     
     // If a category gets created successfully, we just redirect to categories list
     // no need to render a page
      models.Category.create({
        title: req.body.title ,
        description: req.body.description 
        }).then(category=> {
        console.log("rendering category detail");
        res.redirect('/doc/categories');
      }).catch(error=>{
          console.log("There was an error: " + error);
          res.status(404).send(error);
      });
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
        // GET logic to delete a category here
        
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(function() {
           // If an category gets deleted successfully, we just redirect to categories list
           // no need to render a page
            res.redirect('/blog/categories');
            console.log("Category deleted successfully");
          });
        
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
   
        models.Category.destroy({
            // find the category_id to delete from database
            where: {
              id: req.params.category_id
            }
          }).then(category=> {
                console.log("rendering category detail");
                res.render('pages/:category_id', { title: 'Category Delete', category:category, layout: 'layouts/detail'});
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });   
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
        console.log("ID is " + req.params.category_id);
        models.Category.findById(
                req.params.category_id
        ).then(function(category) {
               // renders a category form
               res.render('forms/category_form', { title: 'Update Category', category: category, layout: 'layouts/detail'});
               console.log("Category update get successful");
          });
};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
        console.log("ID is " + req.params.category_id);
        models.Category.update(
        // Values to update
            {
                title: req.body.title ,
                description: req.body.description 
            },
          { // Clause
                where: 
                {
                    id: req.params.category_id
                }
            }
        //   returning: true, where: {id: req.params.post_id} 
         ).then(category=> {
            console.log("rendering category detail");
            res.redirect('/doc/category/' + req.params.category_id);
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {

        // find a post by the primary key Pk
        models.Category.findById(
                req.params.category_id
        ).then(category=> {
        models.Document.findAll({
            where:{
                CategoryId: category.id
            }
        }).then(documents=> {
            console.log("rendering category detail");
            res.render('pages/category_detail', { title: 'Category Detail', category:category, documents, layout: 'layouts/detail'});
            })
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
        
};

// Display list of all categories.
exports.category_list = function(req, res, next) {
        // controller logic to display all categories
        models.Category.findAll(
                ).then(categories=> {
                console.log("rendering category list");
                res.render('pages/category_list', { title: 'Category List', categories: categories, layout: 'layouts/list'})
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

 
 