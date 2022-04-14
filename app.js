const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const render = require("./lib/htmlRenderer.js");


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
const idArr = [];


function outer() {
  function manager() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'nameOfManager',
        message: `Please enter manager's name.`,
        validate: function (answer) {
          if (answer !== '') {
            return true;
          }
          return 'Please enter valid name with at least one character.'
        },
      },
      {
        type: 'input',
        name: 'managerIdNumber',
        message: `Please enter the manager's id number.`,
        validate: function (answer) {
          if (answer !== '') {
            return true;
          }
            return 'Please enter manager id number.'
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: `Please enter the manager's email address.`,
          validate: function (answer) {
            if(answer !== '') {
              return true;
            }
              return `Please enter a valid email address.`;
            },
        },
        {
          type: 'input',
          name: 'officeNumber',
          message: `What is the manager's office number?`,
          validate: function (answer) {
            if(answer !== '') {
              return true;
            }
              return 'Please enter office number.'
          },
        },
    ])
    .then((answers) => {
      const teamManager = new Manager(
        answers.nameOfManager,
        answers.managerIdNumber,
        answers.managerEmail,
        answers.officeNumber
      );
      teamMates.push(teamManager);
      idArr.push(answers.managerIdNumber);
      makeTeam();
    });
  }

  function makeTeam() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'chooseMember',
        message: 'Please select what type of team member you would like to add.',
        choices: [
          'Engineer',
          'Intern',
          'No need to add more members.'
        ],
      },
    ])
    .then((userSelection) => {
      switch(userSelection.chooseMember) {
        case 'Engineer':
          inputEngineer();
          break;
        case 'Intern':
          inputIntern();
          break;
        default:
          setupTeam();
      }
    });
  }

  function inputEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'nameOfEngineer',
        message: `Please enter the engineer's name.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
          return `Please enter valid a valid name.`;
        },
      },
      {
        type: 'input',
        name: 'engineerIdNumber',
        message: `Please enter the engineer's id number.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
            return `Please enter a valid engineer's id number.`
        },
      },
      {
        type: 'input',
        name: 'engineerEmail',
        message: `Please enter the engineer's email address.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
            return 'Please enter a valid email address.'
        },
      },
      {
        type: 'input',
        name: 'github',
        message: `Please enter the engineer's GitHub Username.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
            return `Please enter a valid username.`
        },
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.nameOfEngineer,
        answers.engineerIdNumber,
        answers.engineerEmail,
        answers.github
      );
      teamMates.push(engineer);
      idArr.push(answers.engineerIdNumber);
      makeTeam();
    });
  }

  function inputIntern() {
    inquirer.prompt([
      {
        type: 'input', 
        name: 'nameOfIntern',
        message: `Please enter the intern's name.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
          return 'Please enter a valid name.';
        },
      },
      {
        type: 'input',
        name: 'internIdNumber',
        message: `Please enter the intern's id number.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
          return `Please enter a valid number.`
        },
      },
      {
        type: 'input',
        name: 'internEmail',
        message: `Please enter the intern's email address.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
          return `Please enter a valid email address.`
        },
      },
      {
        type: 'input',
        name: 'school',
        message: `Please enter intern's school name.`,
        validate: function (answer) {
          if(answer !== '') {
            return true;
          }
          return 'Please enter at least one character.';
        },
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.nameOfIntern,
        answers.internIdNumber,
        answers.internEmail,
        answers.school
      );
      teamMates.push(intern);
      idArr.push(answers.internIdNumber);
      makeTeam();
    });
  }

  function setupTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMates), 'utf-8');
  }

manager();
}

outer();