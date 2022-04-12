const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const render = require("./Develop/lib/htmlRenderer.js");
const { runInThisContext } = require("vm");
const { userInfo } = require("os");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//make an array to store user input
const teamMates = [];

//prompt user
inquirer.prompt([
  {
    type: 'input',
    message: 'Enter employee name: ',
    name: 'name',
    validate: function(nameInput) {
      if(nameInput) {
        return true;
      }else{
        return 'Please enter employee name.';
      }
    }
  },

  {
    type: 'input',
    message: 'Please enter your email:',
    validate: function (emailInput) {
      if(emailInput) {
        return true;
      }else {
        return 'Please enter employee email address.';
      }
    }
  },

  {
    type: 'input',
    message: 'Please enter employee id',
    name: 'id',
    validate: function (idInput) {
      if (idInput){
        return true;
      }else {
        return 'Please enter employee Id.';
      }
    }
  },

  {
    type: 'list',
    message: 'Select a Role: ',
    name: 'role',
    choices: ['Manager', 'Engineer', 'Intern']
  },

])

.then(answers => {

  if(answers.role === 'Manager') {
    inquirer.prompt([
      {
        type: 'input',
        name: 'office',
        message: 'Enter office number: ',
        validate: officeInput => {
          if(officeInput) {
            return true;
          }else {
            return 'Please enter office number.';
          }
        }
      }
    ])
  .then(response => {
    console.log(response.office);
    const ManagerTeam = new Manager (answers.name, answers.email, answers.id, answers.role, response.office)
    teamMembers.push(ManagerTeam);
    addOption()
  })
  }else if(answers.role === 'Engineer'){
    inquirer.prompt([
     {
      type: 'input',
      name: 'github',
      message: 'Enter Github Username: ',
      validate: githubInput => {
          if(githubInput) {
            return true;
          }else{
            return 'Please enter Github Username.';
          }
        } 
      }
    ])
    .then(response => {
      console.log(response.github);
      const EngineerTeam = new Engineer (answers.name, answers.email, answers.id, answers.role, response.github)
      teamMates.push(EngineerTeam);
      addOption()
    })
  }else if(answers.role === 'Intern'){
      inquirer.prompt([
        {
          type: 'input',
          name: 'school',
          message: 'Enter school name: ',
          validate: function (schoolInput) {
            if(schoolInput) {
              return true;
            }else {
              return 'Please enter school name.';
            }
          }
        }
      ])
      .then(response => {
        console.log(response.school);
        const internTeam = new Intern (answers.name, answers.email, answers.id, answers.role, response.school)
        teamMates.push(internTeam);
        addOption()
      })
  }else {
    const employeeTeam = new Employee (answers.name, answers.email, answers.id, answers.role);
    teamMembers.push(employeeTeam);
    addOption()
  }

  //add employee if needed

function addOption(){
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'addMore',
      message: 'Would you like to add another team member?',
    }
  ])
  .then(res => {
    if(res.addMore === true){
      userInfo(teamMates)
    }else {
      console.log('team', teamMates)
      let cardLayoutHtml = generateTemplate (teamMates);
      generateHtml(cardLayoutHtml)
    }
  })
}
})

userInfo();

function buildTeam() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamMates), 'utf-8');
}
//createManager();
