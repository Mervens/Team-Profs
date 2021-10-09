const inquirer = require('inquirer');
const path = require('path');
const util = require('util');
const fs = require('fs');
const Logger = require('./logger.js');
const writeFileAsync = util.promisify(fs.writeFile);

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRender');

const teamArray = [];

//* Introduction and Beginning

const cliIntQ = {
	type: 'list',
	message: `
    	You have accessed the Team Profile Generator. 

    	You will input information on each of the users in your team. This information includes name, contact information, as well as their status.
		It will be reprinted in a visible HTML format, with each member in a specific block.

        Do you wish to continue?`,
	choices: ['Yes', 'No'],
	name: 'cliIntroQ',
};

const managerQ = [
	{
		type: 'input',
		message: "What is the Manager's name?",
		name: 'managerName',
	},
	{
		type: 'input',
		message: "What is the Manager's ID number?",
		name: 'managerId',
		validate: idInput => {
			idFormat = /^[0-9]+$/.test(idInput);
			if (idFormat) {
				console.log(`
				------------------------------
				ID Accepted. Next,
				------------------------------`);
				return true;
			} else {
				console.log(` 
				------------------------------
				Invalid ID
				------------------------------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the Manager's email?",
		name: 'manageEmail',
		validate: emailInput => {
			emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);
			if (emailFormat) {
				console.log(`
				------------------------------
				Proper Email. Next,
				------------------------------`);
				return true;
			} else {
				console.log(`
				------------------------------
				Invalid Email
				------------------------------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is the Manager's office number?",
		name: 'managerOfficeNumber',
	},
];

// Prompt user to ask for TeamMember
const addMember = {
	type: 'list',
	message: 'Would you like to add another team member to this team? Select Yes to add an Engineer or Intern team member or select No if no additional team members need to be added.',
	choices: ['Yes', 'No'],
	name: 'teamSize',
};

const teamMemberRolePick = {
	type: 'list',
	message: 'Is the upcoming team member an Engineer or an Intern?',
	choices: ['Engineer', 'Intern'],
	name: 'teamMemberRoleType',
};

const engineerQ = [
	{
		type: 'input',
		message: "What is this Engineer's name?",
		name: 'enginnerName',
	},
	{
		type: 'input',
		message: "What is this Engineer's ID number?",
		name: 'engineerId',
		validate: idInput => {
			idFormat = /^[0-9]+$/.test(idInput);
			if (idFormat) {
				console.log(`
				------------------------------
				ID Accepted. Next,
				------------------------------`);
				return true;
			} else {
				console.log(` 
				------------------------------
				Invalid ID
				------------------------------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is this Engineer's email?",
		name: 'engineerEmail',
		validate: emailInput => {
			emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);
			if (emailFormat) {
				console.log(`
				------------------------------
				Proper Email. Next,
				------------------------------`);
				return true;
			} else {
				console.log(`
				------------------------------
				Invalid Email
				------------------------------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is this Engineer's GitHub Profile Name?",
		name: 'engineerGithub',
	},
];

const internQ = [
	{
		type: 'input',
		message: "What is this Intern's name?",
		name: 'internName',
	},
	{
		type: 'input',
		message: "What is this Intern's ID number?",
		name: 'internId',
		validate: idInput => {
			idFormat = /^[0-9]+$/.test(idInput);
			if (idFormat) {
				console.log(`
				------------------------------
				ID Accepted. Next,
				------------------------------`);
				return true;
			} else {
				console.log(` 
				------------------------------
				Invalid ID
				------------------------------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "What is this Intern's email?",
		name: 'internEmail',
		validate: emailInput => {
			emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);
			if (emailFormat) {
				console.log(`
				------------------------------
				Proper Email. Next,
				------------------------------`);
				return true;
			} else {
				console.log(`
				------------------------------
				Invalid Email
				------------------------------`);
				return false;
			}
		},
	},
	{
		type: 'input',
		message: "Does the Intern have a place of study/education?",
		name: 'internSchool',
	},
];

function cliIntro() {
	inquirer.prompt(cliIntQ).then((appStart) => {
		if (appStart.cliIntroQ === 'Yes') {
			console.log('Let us initialize. Input project manager information.');
			managerInfo();
		} else {
			console.log(`
			------------------------------------------------------------------
					--No information to begin. Canceled.--
			------------------------------------------------------------------
            `);
		}
	});
}

function managerInfo() {
	inquirer.prompt(managerQ).then((managerBuild) => {
		let manager = new Manager(managerBuild.managerName, managerBuild.managerId, managerBuild.manageEmail, managerBuild.managerOfficeNumber);
		teamArray.push(manager);
		teamSizeInfo();
	});
}

function teamSizeInfo() {
	inquirer.prompt(addMember).then((teamSize) => {
		if (teamSize.teamSize === 'Yes') {
			teamMemberLoop();
		}
		if (teamSize.teamSize === 'No') {
			renderHTML(teamArray);
		}
	});
}

function teamMemberLoop() {
	inquirer.prompt(teamMemberRolePick).then((teamrole) => {
		if (teamrole.teamMemberRoleType === 'Engineer') {
			console.log('Information on project engineer(s).');

			inquirer.prompt(engineerQ).then((engineerBuild) => {

				let engineer = new Engineer(engineerBuild.enginnerName, engineerBuild.engineerId, engineerBuild.engineerEmail, engineerBuild.engineerGithub);
				teamArray.push(engineer);

				teamSizeInfo();
			});
		} else if (teamrole.teamMemberRoleType === 'Intern') {
			log.magenta('Information on project intern(s).');
			inquirer.prompt(internQ).then((internBuild) => {
				let intern = new Intern(internBuild.internName, internBuild.internId, internBuild.internEmail, internBuild.internSchool);
				teamArray.push(intern);
				teamSizeInfo();
			});
		}
	});
}


async function renderHTML(file) {
	const htmlProfilePage = render(file);

	await writeFileAsync(outputPath, htmlProfilePage).then(function () {
		console.log(`
        ------------------------------------------------------------------
        			--Team Generated. HTML has been created.--
        ------------------------------------------------------------------
        `);
	});
}

cliIntro();
// Initiate