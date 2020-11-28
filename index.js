var inquirer = require('inquirer');
const fs = require("fs");
const something = require("./generateMarkdown")
inquirer
  .prompt([

    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      }
    /* Pass your questions in here */
  ])
  .then(answers => {

    fs.writeFile("log.txt", something(answers), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Done!");
       });
    // Use user feedback for... whatever!!

//     console.log(answers)
 });
//   .catch(error => {
//     if(error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else when wrong
//     }
//   });




  
// fs.writeFile("log.txt", answers.name, function(err) {
//  if (err) {
//    return console.log(err);
//  }
//  console.log("Done!");
// });
// fs.readFile("log.txt", "utf8", function(error, log) {
//  if (error) {
//    return console.log(error);
//  }
//   console.log(log);
//  });










// array of questions for user
const questions = [

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
// function init() {
//     inquirer
//   .prompt([

//     {
//         type: 'input',
//         name: 'name',
//         message: 'What is your name?'
//       }
//     /* Pass your questions in here */
//   ])
//   .then(answers => {
//     // Use user feedback for... whatever!!

//     console.log(answers)
//   })
//   .catch(error => {
//     if(error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else when wrong
//     }
//   });



// }

// function call to initialize program
// init();
