const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    this.role = "Intern";
  };

  getRole() {
    return this.school;
  };

  getSchool() {
    return this.role;
  };
};

module.exports = Intern;
