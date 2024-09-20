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

        if(action === 'Criar Conta') { createAccount() }

    })
    .catch(err => console.log(err))
}

// CRIAR CONTA
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir:'))
    buildAccount()
}

function buildAccount() {

    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a conta:'
        }
    ]).then(answer => {
        const accountName = answer['accountName']
        console.info(accountName)

        if(!fs.existsSync('accountsDB')) { // se nao existir o diretorio das contas, criar um
            fs.mkdirSync('accountsDB')
        }

        if(fs.existsSync(`accountsDB/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Conta já existente, escolha outro nome!'))
            buildAccount()
            return
        }

        fs.writeFileSync(
            `accountsDB/${accountName}.json`, 
            '{"balance": 0}', // padrao .json
            function(err) {
                console.log(err)
            },
        )

        console.log(chalk.green('Conta criada com sucesso.'))
        operation()
    })
    .catch(err => console.log(err))
}



// DEPOSITAR

// VER SALDO

// SACAR
