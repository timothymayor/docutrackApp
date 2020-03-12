'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });
 
  // create association between category and document
  // an category can have many documents
  Category.associate = function(models) {
    models.Category.hasMany(models.Document);
  };
  
  return Category;
};

 


// Make sure you complete other models fields