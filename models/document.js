'use strict';
module.exports = (sequelize, DataTypes) => {
  var Document = sequelize.define('Document', {
    subject: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    TypeId: DataTypes.INTEGER,
    EmployeeId: DataTypes.INTEGER,
    ApplicationId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  });
  
  // create document association
  // a document will have an employee
  // a field called EmployeeId will be created in our document table inside the db
  Document.associate = function (models) {
    models.Document.belongsTo(models.Employee, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }   
    });
    models.Document.belongsTo(models.Category);
        
    models.Document.hasMany(models.Comment);
        
    models.Document.belongsTo(models.Application);
        
    models.Document.belongsTo(models.Type);
  };
  
  
  
  return Document;
};

// Make sure you complete other models fields