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

        if(action === 'Criar Conta') { createAccount() } else 
        if(action === 'Depositar') { deposit() } else
        //if(action === 'Sacar') {  } else
        if(action === 'Sair') { 

            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!')) 
            process.exit()
        }

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
function deposit() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da conta?'

        }
    ])
    .then((answer) => {

        const accountName = answer['accountName']

        // verificando conta
        if(!verifyAccount(accountName)) {
            return deposit()
        }
        
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Qual o valor do depósito?'
            },    
        ]).then((answer) => {

            const amount = answer['amount']

            addAmount(accountName, amount)

            operation()

        }).catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

function addAmount(accountName, amount) {

    if(!amount) {
        console.log(chalk.bgRed.black("Ocorreu um erro. Tente novamente.")) // caso o usuario nao insira valor
        deposit()
    }

    const accountData = getAccount(accountName) //  accountData recebe um JSON, ou seja, é um objeto

    accountData.balance += parseFloat(amount) //amount vem em string, deve ser passado para float

    fs.writeFileSync( // sobrescrevendo o arquivo
        `accountsDB/${accountName}.json`,
        JSON.stringify(accountData), // passando de volta para string para poder retornar ao arquivo
        function(err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta.`))
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accountsDB/${accountName}.json`, {
        encoding: 'utf8', // padrao br para garantir acentos
        flag: 'r'
    })

    return JSON.parse(accountJSON) // account é um string, precisa ser convertido para objeto
}

// VER SALDO

// SACAR

// VERIFICAR SE CONTA EXISTE

function verifyAccount(accountName) {

    if(!fs.existsSync(`accountsDB/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Conta não existente, escolha outro nome!'))
        return false
    }
    return true
}