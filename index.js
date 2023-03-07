const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.


const getName =  {
        type: 'input', 
        message: 'What is the Employee\'s Name?',
        name: 'name',
            };

const getId = {
        type: 'input', 
        message: 'What is the Employee ID?',
        name: 'ID',
            };

const getEmail = {
        type: 'input', 
        message: 'What is their Email?',
        name: 'email',
            };
 const getOfficeNum = {
        type: 'input', 
        message: 'What is the Manager\'s Office Number?',
        name: 'officeNum',
            };             
const getGitUser =  {
        type: 'input', 
        message: 'What is the Engineer\'s GitHub Username?',
        name: 'gitUsername',
                };
const getSchool =  {
        type: 'input', 
        message: 'What is the Intern\'s School?',
        name: 'school',
                };

const menuChoice =  {
        type: 'list', 
        message: 'Team member added! Please choose from the below:',
        choices: ['Add an Engineer', 'Add an Intern', 'Finish Building the Team'],
        name: 'nextChoice'
                        };
       
const currentTeam = []


const newManager = () => {
    inquirer.prompt([getName, getId, getEmail, getOfficeNum, menuChoice])
    .then((response) => {
        // const manager = generateMarkdown(response);
    const employee = new Manager(response.name, response.ID, response.email, response.officeNum)
    currentTeam.push(employee);
  
    nextPrompt(response.nextChoice);
    });
}

const nextPrompt = (answer) => {
    switch(answer) {
case 'Add an Engineer': newEngineer(); 
break;
case 'Add an Intern': newIntern();
break;
case 'Finish Building the Team':
    generateTeamPage(currentTeam);
    }
}

const newEngineer = () => {
    inquirer.prompt([getName, getId, getEmail, getGitUser, menuChoice])
    .then((response) => {
        // const manager = generateMarkdown(response);
    const employee = new Engineer(response.name, response.ID, response.email, response.gitUsername)
    currentTeam.push(employee);
    nextPrompt(response.nextChoice);
    });
}
const newIntern = () => {
    inquirer.prompt([getName, getId, getEmail, getSchool, menuChoice])
    .then((response) => {
        // const manager = generateMarkdown(response);
    const employee = new Intern(response.name, response.ID, response.email, response.school)
    currentTeam.push(employee);
    nextPrompt(response.nextChoice);
    });
}
        



const init = () => {


}

newManager();


const generateTeamPage = (currentTeam) => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFile(outputPath, render(currentTeam), (error) => error ? console.error(error) : console.log('Success!'));
}
//  


