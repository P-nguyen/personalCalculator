$(document).ready(initializeCalc);

var input = [];
var lastNumber = null;
var lastOperator = null;

function initializeCalc() {
    addEventhandlers();
}

function addEventhandlers() {
    $('.numbers .button').on('click', handleNumbers );
    $('.operators .button').on('click', handleOperator );
    $('.clearEntry .button').on('click', handleClearButtons );
    $('.equal .button').on('click', handleEqual );
}

function handleNumbers() {
    var text = $(this).text();
    var lastInputIndex = input.length-1;
    if(typeof input[0] === 'number'){
        input = [];
        lastOperator = null;
        lastNumber = null;
    }
    if (input[lastInputIndex] % 1 !== 0 && isNaN(text)){
        //checks to see if float is true. if it has a remainder then yes.
        //get out and don't add to it
        return;
    }
    if(isNaN(input[lastInputIndex])){
        input.push(text);
    }else if (input[lastInputIndex].length > 0){
        if(input[input.length-1][input[input.length-1].length-1] !== text){
            input[lastInputIndex] += text;
        }

    }
    console.log('value: ', input);
    updateDisplay();
}

function handleOperator(){
    var text = $(this).text();
    if(input.length === 0){
        return
    }else if(isNaN(input[input.length-1])){
        input.pop();
    }
    input.push(text);
    lastOperator = text;
    lastNumber = input[0];
    updateDisplay();
    console.log('!!!handleOperator: ',lastNumber);
}

function handleClearButtons() {
    var text = $(this).text();
    console.log('value: ', text);
    if(text === 'C'){
        input = [];
    }else{
        input.pop();
    }
    updateDisplay();
}

function handleEqual() {
    var output = input[0];

    if (input.length === 0) {
        output = 'ready';
    }else if(input.length <= 2){//needs to check for [1,+]
        console.log("i'm just hitting =");
        if(lastNumber && lastOperator){
        input[0] = operatorLogic(input,lastOperator,lastNumber);
        console.log('just hitting = ',input[0]);
        }
    }else if(input.length > 1) {
        for (var i = 1; i < input.length - 1; i += 2) {
            debugger;
            output = operatorLogic(output, input[i], input[i + 1]);
            if(isNaN(input[input.length-1])){
                lastNumber = operatorLogic(output, lastOperator, output);
                output = lastNumber;
            }else{
                lastNumber = input[i+1];
            }
            console.log('1+1+ ',lastNumber);
        }
        input = [output];
    }
    updateDisplay(output);
}

function operatorLogic(_inputNum1, _operator, _inputNum2) {
    var output;
    var num1 = parseFloat(_inputNum1);
    var num2 = parseFloat(_inputNum2);
    console.log('num1: ',num1, 'num2: ', num2 );
    switch (_operator){
        case '+':
            output = num1 + num2;
            break;
        case '-':
            output = num1 - num2;
            break;
        case 'x':
            output = num1 * num2;
            break;
        case '÷':
            output = num1 / num2;
            if(output === Infinity){
                output = 'error'
            }
            break;
    }
    return output;
}

function updateDisplay(_textToUpdate) {
    var inputText = _textToUpdate ? _textToUpdate : input[input.length-1];
    $('#input').text(inputText);
}