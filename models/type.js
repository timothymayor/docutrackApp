'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    name: DataTypes.STRING
  });
 
  // create association between type and document
  // an type can have many documents
  Type.associate = function(models) {
    models.Type.hasMany(models.Document);
  };
  
  return Type;
};

 


// Make sure you complete other models fields