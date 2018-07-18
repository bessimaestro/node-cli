#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');

const init = () => {
    console.log(
        chalk.black.bgGreen.bold("Node f*cking JS!")
    );
}

const askQuestions = () => {
    const questions = [
        {
            name: 'FILENAME',
            type: 'input',
            message: 'What is the name of the file without extension?'
        },
        {
            name: 'EXTENSION',
            type: 'list',
            message: 'What is the file extension?',
            choices: ['.rb', '.js', '.php', '.css'],
            filter: (val) => {
                return val.split('.')[1];
            }
        }
    ];
    return inquirer.prompt(questions);
}

const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`;
    shell.touch(filePath);
    return(filePath);
}

const success = (filepath) => {
    console.log(
        chalk.green.bold(`Done! File created at ${filepath}`)
    );
}

const run = async () => {
    // show script introduction
    init();
    
    // ask questions
    const answer = await askQuestions();
    const { FILENAME, EXTENSION } = answer;
    
    // create the file
    const filePath = createFile(FILENAME, EXTENSION);

    // show success message
    success(filePath);
}

run();