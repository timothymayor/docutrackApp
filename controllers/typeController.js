var Type = require('../models/type');
var models = require('../models');

// Display type create form on GET.
exports.type_create_get = function(req, res, next) {
        // create type GET controller logic here 
        
        // renders a type form
        res.render('forms/type_form', { title: 'Create Type',  layout: 'layouts/detail'});
        
};

// Handle type create on POST.
exports.type_create_post = function(req, res, next) {
     // create type POST controller logic here
     
     // If a type gets created successfully, we just redirect to types list
     // no need to render a page
      models.Type.create({
            name: req.body.name 
        }).then(type=> {
                res.redirect('/doc/types');
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display type delete form on GET.
exports.type_delete_get = function(req, res, next) {
        // GET logic to delete a type here
        
        models.type.destroy({
            // find the type_id to delete from database
            where: {
              id: req.params.type_id
            }
          }).then(function() {
           // If a type gets deleted successfully, we just redirect to types list
           // no need to render a page
            res.redirect('/doc/types');
            console.log("Type deleted successfully");
          });
        
};

// Handle type delete on POST.
exports.type_delete_post = function(req, res, next) {
   
        models.Type.destroy({
            // find the type_id to delete from database
            where: {
              id: req.params.type_id
            }
          }).then(type=> {
                res.redirect( '/doc/types')
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display type update form on GET.
exports.type_update_get = function(req, res, next) {
        console.log("ID is " + req.params.type_id);
        models.Type.findById(
                req.params.type_id
        ).then(function(type) {
               // renders a type form
               res.render('forms/type_form', { title: 'Update Type', type: type, layout: 'layouts/detail'});
               console.log("Type update get successful");
          });
};

// Handle type update on POST.
exports.type_update_post = function(req, res, next) {
        console.log("ID is " + req.params.type_id);
        models.Type.update(
        // Values to update
            {
                name: req.body.name,
            },
          { // Clause
                where: 
                {
                    id: req.params.type_id
                }
            }
        //   returning: true, where: {id: req.params.type_id} 
         ).then(type=> {
                res.redirect( 'doc/type/' + req.params.type_id);
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

// Display detail page for a specific type.
exports.type_detail = function(req, res, next) {

        // find a type by the primary key Pk
        models.Type.findById(
                req.params.type_id
        ).then(type=> {
                models.Document.findAll({
                    where:{
                        TypeId: type.id
                    }
                }).then(documents=> {
                    console.log("rendering type detail");
                    res.render('pages/type_detail', { title: 'Type Detail', type:type, documents, layout: 'layouts/detail'});
                });
                }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
        
};

// Display list of all types.
exports.type_list = function(req, res, next) {
        // controller logic to display all types
        models.Type.findAll(
        ).then(types=> {
                console.log("rendering type list");
                res.render('pages/type_list', { types:types, title: 'Type List', layout: 'layouts/list' })
            }).catch(error=>{
                console.log("There was an error: " + error);
                res.status(404).send(error);
            });
};

 