const inquirer = require('inquirer');
const fs = require('fs');
let path ='./README.md';
let $template = "";

// console.log("Hi! Let's get to work!")

try{
    if(fs.existsSync(path)){
        inquirer
            .prompt([
                {
                type:"list",
                message:"Would you like to overwrite the current README.md file?",
                name:"overwrite",
                choices:["yes","no","cancel"]
                }])
            .then(function (response) {
                if (response.overwrite === "no"){
                    path = './README-1.md';
                    getInfo();
                } else if (response.overwrite === "yes"){
                    getInfo();
                };
            })
        } else {getInfo();}
    } catch(err){
        console.error(err);
    }



function getInfo(){
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of your project?",
                name: "Title",
            },
            {
                type:"input",
                message: "Write a summary of your project:",
                name:"description"
            },
            {
                type:"input",
                message:"How do you install your project?",
                name:"installation"
            },
            {
                type:"input",
                message:"How should your project be used?",
                name:"usage"
            },
            {
                type:"input",
                message: "How can people contribute to your project?",
                name:"contribution"
            },
            {
                type:"input",
                name:"tests",
                message:"Explain your projects Tests:"
            },
            {
                type:"list",
                message:"Please choose a license for the project",
                name:"license",
                choices:['MIT','GPL','ISC','APACHE license 2.0', 'BSD','IBM','Unlicense']
            },
            {
                type:"input",
                message:"What is your Github username?",
                name:"Github"
            },
            // {
            //     type:'input',
            //     message:"What is your e-mail address?",
            //     name:"e-mail"
            // },
        ])
        .then(function(response){
            let licenceInfo = "";
            $template += `# ${response.name}\n\n`;
            if(response.license === "MIT"){
                $template +=`[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n`;
                licenceInfo = '(https://opensource.org/licenses/MIT)\n\nYou have the freedom to do as you like with this permissive software, as long as an original copy and license notice is included. I cannon be held liable for this software.\n\n';
            } else if (response.licence === "Apache") {
                $template += `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n\n`;
                licenceInfo = '(http://www.apache.org/licenses/LICENSE-2.0.html)\n\nYou have the freedom to do as you like with this permissive software. This license also contains a patent license from the contributors of the code.\n\n';
            } else if (response.licence === "GPLv3") {
                $template += `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)\n\n`;
                licenceInfo = '(http://www.gnu.org/licenses/gpl-3.0.html)\n\nYou have the freedom to run, study, share, and modify this permissive software. Anyone who acquires this software must make it available to anyone else under the same licensing agreement.\n\n';
            };
            $template += `### Table of Contents\n\n- [Description](#description)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Contribution](#contibution)\n- [Tests](#tests)\n- [License](#license)\n- [Questions](#questions)\n\n`;
            $template += `## Description\n\n${response.description}\n\n`;
            $template += `## Installation\n\n${response.installation}\n\n`;
            $template += `## Usage\n\n${response.usage}\n\n`;
            $template += `## Contribution\n\n${response.contribution}\n\n`;
            $template += `## Tests\n\n${response.tests}\n\n`;
            $template += `## License\n\n${response.license}\n\n`;
            $template += `## Questions\n\nIf you have any questions contact me here:\n\n ##### Github: [github.com/${response.Github}](http://github.com/${response.Github})\n\n`;
        
            fs.writeFile(path,$template, function(err){
                if(err){
                    console.log(err);
                }
            });
        });
}
