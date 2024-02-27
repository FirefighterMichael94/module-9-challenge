// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

const generateMarkdown = ({ title, description, install,github, toc, })=> {
        // Check if toc is a string
        if (typeof toc !== 'string') {
          // If toc is not a string, assign an empty string to toc
          toc = '';
        }
        const tocList = toc.split(',').map(item => `- ${item.trim()}`).join('\n');   

   return `# ${title}'s README

## Description
 -${description}.

## Table of Contents
${tocList}

## How to install 
${install}
## Contact Me
- My GitHub username is ${github}

`;
};

const writeMarkdownToFile = (fileName, markdownContent) =>
 new Promise ((resolve , reject) => {
  fs.writeFile(fileName, markdownContent, (err) => {
     if(err) {
        reject(err) ;
     }  else{
        resolve(`${fileName} has been generated!`);
     } 
  });
  });

// TODO: Create an array of questions for user input
inquirer
 .prompt([
    {
            type:'input',
            name:'title',
            message:'What is the name of your project?',
    },
    {
            type:'input',
            name:'description',
            message:'What is a brief description of your project?',
    },
    {
            type:'input', 
            name:'toc',
            message:'Brief table of contents',
    },
    {
            type:'input',
            name:'install',
            message:'How do you install your product?',
    },
    {
            type:'input' , 
            name:'github',
            message:'What is Your GitHub username?',
    },


    ])
    .then((answers) => { 
      answers.toc = answers.toc.split(',').map(item => item.trim());  
    
 
     const markdownContent = generateMarkdown(answers);

     writeMarkdownToFile('README.md', markdownContent,(err) =>
       err ? console.log(err) : console.log('Successfully created readme.md!')
     );
  
});

// TODO: Create a function to write README file
//fs.writeFile('readme.md' , answers,{Name, Github, LinkedIn},(err)=>

