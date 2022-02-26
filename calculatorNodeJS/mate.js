function multiplicacion(a,b){
    return a * b;
}

function suma(a,b){
    return a + b;
}

function resta(a,b){
    return a - b;
}

function division(a, b){
    return a / b; 
}

function modulo (a, b){
    return a % b;    
}

exports.calculateOperation = function (opertation, firstNum, secondNum){
    let result = "";
    switch(opertation){
        case "+":
            result = suma(firstNum, secondNum)
            break
        case "-":
            result = resta(firstNum, secondNum)
            break
        case "*":
            result = multiplicacion(firstNum, secondNum)
            break
        case "/":
            result = division(firstNum, secondNum)
            break
        case "%":
            result = modulo(firstNum, secondNum)
            break
        default:
            result = "You didn't select a valid option"  
      }
    console.log(result)
  }