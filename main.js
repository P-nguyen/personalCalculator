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

var input = [];
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
    input = [];
    lastOperator = null;
    lastNumber = null;

}

function isFloat(_inputNumStr){// checks to see if number is a float.
    if(_inputNumStr === undefined){
        return false;
    }
    _inputNumStr += 1; // adds 1 to string to make it 1.1
    return _inputNumStr % 1 !== 0;//checks to see if 1.1 is a float.
}

function handleNumbers() {
    var text = $(this).text();
    var lastInputIndex = input.length-1;

    if(typeof input[input.length-1] === 'number') {
        //this checks to see if you already done an equal and resets for a new number.
        resetCalculatorVariables();
    }

    if (isFloat(input[lastInputIndex])&& isNaN(text)){
        //return if float and '.' is pressed.
        return;
    }else if(isNaN(input[lastInputIndex])){
        //checks for operator.
        if(text === '.'){
            //safety net for '.'
            text = '0.'
        }
        input.push(text);
    }else if (input[lastInputIndex].length > 0){
            input[lastInputIndex] += text;
    }
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
}

function handleClearButtons() {
    var text = $(this).text();
    if(text === 'C'){
        resetCalculatorVariables();
    }else{
        input.pop();
    }
    updateDisplay('0');
}

function handleEqual() {
    var output = input[0];

    if (input.length === 0 || input[0] === NaN) {
        output = 'Ready';
    }else if(input.length <= 2){//needs to check for [1,+]
        if(lastNumber && lastOperator){
        input[0] = operatorLogic(input,lastOperator,lastNumber); // do math and store in input[0]
        output = input[0]; // for display to update.
        }
    }else if(input.length > 1) {//if we have a long string of nums and operators.
        if(calcState){
            output = linearDoMath(output);
        }else{
            output = pemdasDoMath(output);
        }
        input = [output];
    }
    updateDisplay(output);
}

function linearDoMath(_output){
    for (var i = 1; i < input.length - 1; i += 2) {
        _output = operatorLogic(_output, input[i], input[i + 1]);
        if(isNaN(input[input.length-1])){
            lastNumber = operatorLogic(_output, lastOperator, _output);
            _output = lastNumber;
        }else{
            lastNumber = input[i+1];
        }
    }
    return _output
}

function pemdasDoMath(_output){
    var pemdasMath;
    var i = 1;
    while(i < input.length){
        if( input[i] === 'x' || input[i] === '÷'){
            pemdasMath = operatorLogic( input[i-1],input[i],input[i+1] )
            input.splice(i-1, 3,pemdasMath);
            i = 1;
        }
        i+=2;
    }
    _output = linearDoMath(input[0]);
    return _output;
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
    var inputText = _textToUpdate ? _textToUpdate : input[input.length-1];
    $('#input').text(inputText);
    if (input.length !== 0){
        inputText = input.join(' ');
    }
    $('h3').text(inputText);
}