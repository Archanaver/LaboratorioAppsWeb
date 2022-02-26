let mateBasica = require('./mate')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  readline.on('close', ()=> {
    console.log('\n Have a great day!');
    process.exit(0);
  });

function calculator(){
    readline.question(`Select the operation ( + - * / %): `, operation => {
        readline.question(`Enter first number: `, firstNum => {
            readline.question(`Enter second number: `, secondNum => {
                mateBasica.calculateOperation(operation, parseInt(firstNum), parseInt(secondNum))
                readline.question(`Another operation? no=0 : `, exit => {
                    if (exit == '0')
                        return readline.close(); 
                    calculator()
                })  
            })
        })
    })
}

calculator()

