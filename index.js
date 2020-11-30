const fs = require("fs");
const path = require("path");
const axios = require("axios");
const inquirer = require("inquirer");



const userquestions = [
    {
        type: "input",
        message: " Github username?",
        name: "username"
    },
    {
        type: "input",
        message: "Project title?",
        name: "title"
    },
    {
        type: "input",
        message: "Your project description?",
        name: "description"
    },
    {
        type: "checkbox",
        message: "What are the contents?",
        name: "table",
        choices: ['Installation', 'Usage', 'License', 'Contributing', 'Tests', 'Questions']
    },
    {
        type: "input",
        message: "Steps for installation?",
        name: "installation"
    },
    {
        type: "input",
        message: "Usage?",
        name: "usage"
    },
    {
        type: "list",
        message: "Which of the following licenses?",
        name: "license",
        choices: [
            'MIT',
            'GNU',
            'Apache'
        ]
    },
    {
        type: "input",
        message: "Who is contributing? ",
        name: "contributing"
    },
    {
        type: "input",
        message: "Please write the details of the testing procedures",
        name: "tests"
    }
];

function writeToFile(data) {
    console.log(data)
    
    let githCont = data.contributing.split(',')
    let githUser = [];
    githCont.map(user=> githUser.push(user.trim()))
    let githUserStr = '';
    githUser.map(user=>{
        githUserStr+= `[${user}]('https://github.com/${user}') \n`
    })
    console.log(githCont)
    
    let content = '';
    
    data.table.map(info=>{
        content += `* [${info}](#${info.toLowerCase()}) \n \n`
    })
    
    let license = data.license === 'MIT' ? "[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]" : data.license === 'GNU' ? 
    "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)]" : "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)]"
    
    let myTxt = `
    # ${data.title}
    ${license}(${data.html_url})
    
    ## Description
    ​
    ${data.description}
    ​
    ## Table of Contents
    ${content}
    ## Installation
    ​
    To install necessary dependencies, run the following command:
    ​
    ${data.installation}
    ​
    ## Usage
    ​
    ${data.usage}
    ​
    ## Licensing
    ​
    This project is licensed under the ${data.license} license.
      

    ## Tests
    ​
    To run tests, run the following command:
    ​
    npm test

    ## Contributors
    ​
    ${githUserStr}
    ​
    ## Questions
    ​
    <img src="${data.avatar_url}" alt="avatar" style="border-radius: 20px" width="30" />
    ​
    If you have any questions about the repo, open an issue or contact [${data.login}](${data.html_url}) at yoda.gmail.com.
    `
    
    fs.writeFile(`${data.title}.md`, myTxt , function(err){
        if(err){
            console.log(err);
            throw err;
        }else{
            console.log('Awesome!')
        }
    })
    };
    
    
    function init() {
        inquirer
            .prompt(userquestions)
            .then(response => {
                console.log(response)
                axios.get(`httpsno://api.github.com/users/${response.username}`).then(data=>{
                    writeToFile({...response, ...data.data})
                }).catch(err=>console.log(err))
            })
            .catch(err => console.log(err))
    }
    
    init();
