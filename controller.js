class Controller {
    constructor(calculator, view){
        this.calculator = calculator;
        this.view = view;
        //$(document).ready(initializeCalc);
        this.initializeCalc();

    }

    initializeCalc() {
        $(document).ready(this.addEventhandlers);
    }

    addEventhandlers() {
        $('.numbers .button').on('click', this.handleNumbers);
        $('.operators .button').on('click', this.handleOperator);
        $('.clearEntry .button').on('click', this.handleClearButtons);
        $('.equal .button').on('click', this.handleEqual);
        $('#togglePemdas').on('click', this.toggleCalcState);
    }

    toggleCalcState() {
        this.calculator.calcState = !this.calculator.calcState;
        if (this.calculator.calcState) {
            $('#togglePemdas').text('Linear')
        } else {
            $('#togglePemdas').text('Pemdas');
        }
    }

    handleNumbers() {
        var text = $(this).text();
        var lastInputIndex = this.calculator.calcInput.length - 1;

        if (typeof this.calculator.calcInput[this.calculator.calcInput.length - 1] === 'number') {
            this.calculator.resetCalculatorVariables(); //this checks to see if you already done an equal and resets for a new number.
        }

        if (this.calculator.isFloat(this.calculator.calcInput[lastInputIndex]) && isNaN(text)) { // if its an X / or something make sure this is false.
            return; //return if float and '.' is pressed.
        } else if (isNaN(this.calculator.calcInput[lastInputIndex])) { //checks for operator.

            if (text === '.') {
                text = '0.';  //safety net for '.'
            }
            this.calculator.calcInput.push(text);
        } else if (this.calculator.calcInput[lastInputIndex].length > 0) {
            this.calculator.calcInput[lastInputIndex] += text;
        }
        this.view.updateDisplay();
    }

    handleOperator() {
        var text = $(this).text();
        if (this.calculator.calcInput.length === 0) {
            return
        } else if (isNaN(this.calculator.calcInput[this.calculator.calcInput.length - 1])) {
            this.calculator.calcInput.pop();
        }
        this.calculator.calcInput.push(text);
        this.view.updateDisplay();
    }

    handleClearButtons() {
        var text = $(this).text();
        if (text === 'C') {
            this.calculator.resetCalculatorVariables();
        } else {
            this.calculator.calcInput.pop();
        }
        this.view.updateDisplay('0');
    }

    handleEqual() {
        var result;

        if (this.calculator.calcInput.length === 0) {
            result = 'Ready';
        } else {
            if (this.calculator.calcState) {
                result = this.calculator.linearDoMath();
            } else {
                result = this.calculator.pemdasDoMath();
            }
            this.calculator.calcInput = [result];
        }
        this.view.updateDisplay(result);
    }

}