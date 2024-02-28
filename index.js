// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')


// Create new sections here that you want to have links to here this construct is your generateMarkdown
const generateMarkdown = ({ title, description, install, usage, credits, github, email, toc, licensing }) => {
    const tocList = toc.split(',').map(item => `- [${item.trim()}](#${item.trim().toLowerCase().replace(/\s/g, '-')})`).join('\n');
//as well as add here with ## infront of your section name and ${'sectionname lowercase'}literal  
    return `# ${title}'s README

  ## Description
  - ${description}
  
  ## Table of Contents
  ${tocList}
  
  ## How to install 
  ${install}
  
  ## Usage
  ${usage}
  
  ## Credits
  ${credits}
  
  ## License
  ${licensing}
  
  ## Questions
  - My GitHub: ${github}
  - Email: ${email}
  
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

//  Add your user generated inputs with the type input or give options with the checbox type.
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
            type:'input',
            name:'usage',
            message:'How do you use this Product'
    },
    {
            type:'input',
            name:'credits',
            message:'Name your collaborators.'
    },
    {
            type:'input' , 
            name:'github',
            message:'What is Your GitHub username?',
    },
    {
            type:'input',
            name:'email',
            message:'What is  your email for this project'
    },
    {
            type:'checkbox',
            name:'licensing',
            message:'Which license do you have?',
            choices:[
                {name:'Apache 2.0'},
                {name:'MIT'},
                {name:'ISC'},
                {name:'GPL 3.0'},
                {name:'BSD 3'},
                {name:''},
            ]

    },


    ])
    .then((answers) => { 
      
     //this function creates your markdown file using your input into a Readme file.
     const markdownContent = generateMarkdown(answers);

     writeMarkdownToFile('README.md', markdownContent,(err) =>
       err ? console.log(err) : console.log('Successfully created readme.md!')
     );
  
});
