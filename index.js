//const inquirer = require("inquirer")
//const chalk = require("chalk")
//const fs = require("fs")

import inquirer from "inquirer"
import chalk from "chalk"
import fs from "fs"

operation()


function operation () {
    
    inquirer.prompt([{
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
        },
    ])
    .then((answer) => {

        const action = answer['action'] // action recebendo a escolha armazenada em name: action

    })
    .catch(err => console.log(err))
}

