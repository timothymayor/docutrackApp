'use strict';
module.exports = (sequelize, DataTypes) => {
  var Application = sequelize.define('Application', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });
 
  // create association between category and document
  // an category can have many documents
  Application.associate = function(models) {
    models.Application.hasMany(models.Document);
  };
  
  return Application;
};

 


// Make sure you complete other models fields