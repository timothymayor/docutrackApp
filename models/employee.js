'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    dob: DataTypes.STRING,
    address: DataTypes.STRING,
    department: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
    }},
  });


  Employee.associate = function(models) {
    models.Employee.hasMany(models.Document);
  };
  
  // models.Employee.belongsToMany(models.Comment, {
  //   as: 'comments',
  //   through: 'EmployeeComments',
  //   foreignKey: 'employee_id'

  // });
  
  return Employee;
};
 