#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.cyan("<<<<<<<<<< Welcome To EasyPaisa App >>>>>>>>>>"));

const transactionHistory = []; 

const start = await inquirer.prompt([
    {
        name: "pincode",
        type: "password", 
        mask: "*", 
        message: chalk.cyanBright("Enter Your 5 Digit Pincode :")
    }
]);

if (start.pincode >= 10000 && start.pincode <= 99999) {
    console.log(chalk.green("Correct Pincode."));

    let balance = 30000;

    while (true) {
        const operation = await inquirer.prompt([
            {
                type: "list",
                name: "Question1",
                message: chalk.magenta("Select Your Desired Operations :"),
                choices: [
                    chalk.blue('Available balance'),
                    chalk.blue('Money Transfer'),
                    chalk.blue('Bank Transfer'),
                    chalk.blue('Transaction History'),
                    chalk.blue('Exit')
                ]
            }
        ]);

        if (operation.Question1 === chalk.blue('Available balance')) {
            console.log(chalk.green(`Your Current Balance is: ${balance}`));
        } else if (operation.Question1 === chalk.blue('Money Transfer')) {
            const transfer = await inquirer.prompt([
                {
                    name: 'money',
                    type: 'number',
                    message: chalk.cyan('Enter Amount You Want To Transfer :'),
                }
            ]);
            let remaining = balance - transfer.money;
            if (transfer.money > balance) {
                console.log(chalk.red("Insufficient Balance"));
            } else if (transfer.money <= balance) {
                console.log(chalk.green(`Transaction successful! Your Remaining Balance is: ${remaining}`));
                transactionHistory.push({ type: 'Money Transfer', amount: transfer.money, date: new Date() }); 
                balance = remaining; 
            } else {
                console.log(chalk.redBright('Invalid Number'));
            }
        } else if (operation.Question1 === chalk.blue('Bank Transfer')) {
            const bankTransfer = await inquirer.prompt([
                {
                    name: 'bankName',
                    type: 'list',
                    message: chalk.gray('Select Bank for Transfer:'),
                    choices: [
                        chalk.magenta('HBL'),
                        chalk.magenta('UBL'),
                        chalk.magenta('Meezan')
                    ]
                },
                {
                    name: 'accountNumber',
                    type: 'number',
                    message: chalk.cyan.bold('Enter Recipient Account Number:')
                },
                {
                    name: 'amount',
                    type: 'number',
                    message: chalk.magenta('Enter Amount You Want To Transfer:')
                }
            ]);
           
            console.log(chalk.green(`Successfully transferred PKR ${bankTransfer.amount} to ${bankTransfer.bankName}.`));
            transactionHistory.push({
                type: 'Bank Transfer',
                bank: bankTransfer.bankName,
                amount: bankTransfer.amount,
                recipientAccount: bankTransfer.accountNumber,
                date: new Date()
            });
        } else if (operation.Question1 === chalk.blue('Transaction History')) {
            console.log(chalk.magenta('Transaction History:'));
            for (const transaction of transactionHistory) {
                console.log(`${transaction.type} - Amount: ${transaction.amount}, Date: ${transaction.date}`);
            }
        } else {
            console.log(chalk.greenBright("Thank You for using Easypaisa App! Kindly Share Your Experience ."));
            break;
        }
    }
} else {
    console.log(chalk.red("Invalid Pincode! Please Enter 5 Digit Pincode."));
}
