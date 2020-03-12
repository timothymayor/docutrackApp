'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    DocumentId: DataTypes.INTEGER
  });
  
  Comment.associate = function (models) {
  models.Comment.belongsTo(models.Document, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  models.Comment.belongsTo(models.Employee);
  // models.Comment.belongsToMany(models.Employee, {
  //   as: 'employees',
  //   through: 'EmployeeComments',
  //   foreignKey: 'comment_id'

  // });
  };
  
  return Comment;
};

// Make sure you complete other models fields
