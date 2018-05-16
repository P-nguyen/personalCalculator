$(document).ready(initializeCalc);

var input = [];

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

    if(isNaN(input[lastInputIndex])){
        input.push(text);
    }else if (input[lastInputIndex] > 0){
        input[lastInputIndex] += text;
    }
    console.log('value: ', input);
    updateDisplay();
}

function handleOperator(){
    var text = $(this).text();
    console.log('value: ', text)
    input.push(text);
    updateDisplay();
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
    for(var i = 1; i<input.length-1; i+=2){
        output = operatorLogic(output,input[i],input[i+1]);
    }
    console.log(output);
    return output;
}

function operatorLogic(_inputNum1, _operator, _inputNum2) {
    var output;
    var num1 = parseFloat(_inputNum1);
    var num2 = parseFloat(_inputNum2);
    switch (_operator){
        case '+':
            output = num1 + num2;
            break;
        case '-':
            output = num1 - num2;
            break;
        case 'X':
            output = num1 * num2;
            break;
        case '÷':
            output = num1 / num2;
            break;
    }
    return output;
}

function updateDisplay() {
    var inputText = input.join();
    var outputText =inputText.replace(/,/g,'');
    $('#input').text(outputText);
}