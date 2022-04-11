const Employee = require('./Employee.js');

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = "Manager";
  };

  getName() {
    return this.name;
  };

  getId() {
    return this.id;
  };

  getEmail() {
    return this.email
  }

  getRole() {
    return this.role;
  };
};

module.exports = Manager