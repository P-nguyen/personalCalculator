$(document).ready(initializeCalc);

function initializeCalc() {
    addEventhandlers();
}

function addEventhandlers() {
    $('.numbers .button').on('click', handleNumbers );
    $('.operators .button').on('click', handleOperator );
    $('.clearEntry .button').on('click', handleClearButtons );
    $('.equal .button').on('click', handleEqual );

    $('#togglePemdas').on('click',toggleCalcState);
}

var calcInput = [];
var lastNumber = null;
var lastOperator = null;
var calcState = true;

function toggleCalcState() {
    calcState = !calcState;
    if(calcState){
        $('#togglePemdas').text('Linear')
    }else {
        $('#togglePemdas').text('Pemdas');
    }
}
function resetCalculatorVariables() {
    calcInput = [];
    lastOperator = null;
    lastNumber = null;

}

function isFloat(_inputNumStr){// checks to see if number is a float.
    if(isNaN(_inputNumStr)){
        return false;
    }
    _inputNumStr += 1; // adds 1 to string to make it 1.1
    return _inputNumStr % 1 !== 0;//checks to see if 1.1 is a float.
}

function handleNumbers() {
    var text = $(this).text();
    var lastInputIndex = calcInput.length-1;

    if(typeof calcInput[calcInput.length-1] === 'number') {
        //this checks to see if you already done an equal and resets for a new number.
        resetCalculatorVariables();
    }

    if (isFloat(calcInput[lastInputIndex])&& isNaN(text)){ // if its an X / or something make sure this is false.
        //return if float and '.' is pressed.
        return;
    }else if(isNaN(calcInput[lastInputIndex])){
        //checks for operator.
        if(text === '.'){
            //safety net for '.'
            text = '0.'
        }
        calcInput.push(text);
    }else if (calcInput[lastInputIndex].length > 0){
            calcInput[lastInputIndex] += text;
    }
    updateDisplay();
}

function handleOperator(){
    var text = $(this).text();
    if(calcInput.length === 0){
        return
    }else if(isNaN(calcInput[calcInput.length-1])){
        calcInput.pop();
    }
    calcInput.push(text);
    lastOperator = text;
    lastNumber = calcInput[0];
    updateDisplay();
}

function handleClearButtons() {
    var text = $(this).text();
    if(text === 'C'){
        resetCalculatorVariables();
    }else{
        calcInput.pop();
    }
    updateDisplay('0');
}

function handleEqual() {
    var result;

    if (calcInput.length === 0 || result === NaN) {
        result = 'Ready';
    // }else if(calcInput.length <= 2){//needs to check for [1,+]
    //     if(lastNumber && lastOperator){
    //     calcInput[0] = operatorLogic(calcInput,lastOperator,lastNumber); // do math and store in calcInput[0]
    //     output = calcInput[0]; // for display to update.
    //     }
    }else{ // if(calcInput.length >= 2) {//if we have a long string of nums and operators.
        if(calcState){
            result = linearDoMath();
        }else{
            result = pemdasDoMath();
        }
        calcInput = [result];
    }
    updateDisplay(result);
}

function linearDoMath(){
    var result = calcInput[0];
    var num2;
    var operator = lastOperator;

    for (var i = 1; i < calcInput.length || lastOperator != null; i += 2) {

        operator = calcInput[i];
        num2 = calcInput[i+1];

        if(!operator && !num2){
            operator = lastOperator;
            num2 = lastNumber;
        }else if(!num2){
            num2 = result;
        }

        result = operatorLogic(result, operator, num2);
        lastNumber = num2;
        lastOperator = null;
    }
    lastOperator = operator; // = +
    return result
}

function pemdasDoMath(){
    var replaceMathVar;
    var result;
    var i = 1;
    while(i < calcInput.length){
        if( calcInput[i] === 'x' || calcInput[i] === '÷'){
            replaceMathVar = operatorLogic( calcInput[i-1],calcInput[i],calcInput[i+1] )
            calcInput.splice(i-1, 3,replaceMathVar);
            i = 1;
        }
        i+=2;
    }
    result = linearDoMath(calcInput[0]);
    return result;
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
        case 'x':
            output = num1 * num2;
            break;
        case '÷':
            output = num1 / num2;
            if(output === Infinity){
                output = 'sys error'
            }
            break;
    }
    return output;
}

function updateDisplay(_textToUpdate) {
    var inputText = _textToUpdate ? _textToUpdate : calcInput[calcInput.length-1];
    $('#calcInput').text(inputText);
    if (calcInput.length !== 0){
        inputText = calcInput.join(' ');
    }
    $('h3').text(inputText);
}