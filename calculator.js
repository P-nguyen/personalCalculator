class Calculator {
    constructor() {
        this.calcInput = [];
        this.lastNumber = null;
        this.lastOperator = null;
        this.calcState = true;
    }

    resetCalculatorVariables() {
        this.calcInput = [];
        this.lastOperator = null;
        this.lastNumber = null;

    }

    toggleCalcState() {
        this.calcState = !this.calcState;
        if (this.calcState) {
            $('#togglePemdas').text('Linear')
        } else {
            $('#togglePemdas').text('Pemdas');
        }
    }

    isFloat(_inputNumStr) {// checks to see if number is a float.
        if (isNaN(_inputNumStr)) {
            return false;
        }
        _inputNumStr += 1; // adds 1 to string to make it 1.1
        return _inputNumStr % 1 !== 0;//checks to see if 1.1 is a float.
    }

    handleNumbers(_input) {
        var lastInputIndex = this.calcInput.length - 1;

        if (typeof this.calcInput[this.calcInput.length - 1] === 'number') {
            this.resetCalculatorVariables(); //this checks to see if you already done an equal and resets for a new number.
        }

        if (this.isFloat(this.calcInput[lastInputIndex]) && isNaN(_input)) { // if its an X / or something make sure this is false.
            return; //return if float and '.' is pressed.
        } else if (isNaN(this.calcInput[lastInputIndex])) { //checks for operator.

            if (_input === '.') {
                _input = '0.';  //safety net for '.'
            }
            this.calcInput.push(_input);
        } else if (this.calcInput[lastInputIndex].length > 0) {
            this.calcInput[lastInputIndex] += _input;
        }
        return this.calcInput;
    }

    handleOperator(_input) {
        if (this.calcInput.length === 0) {
            return
        } else if (isNaN(this.calcInput[this.calcInput.length - 1])) {
            this.calcInput.pop();
        }
        this.calcInput.push(_input);
        return this.calcInput;
    }

    handleClearButtons(_input) {
        var result;
        if (_input === 'C') {
            this.resetCalculatorVariables();
            result = ['0']
        } else {
            this.calcInput.pop();
            result = this.calcInput
        }
        return result;
    }

    handleEqual() {
        var result;

        if (this.calcInput.length === 0) {
            result = 'Ready';
        } else {
            if (this.calcState) {
                result = this.linearDoMath();
            } else {
                result = this.pemdasDoMath();
            }
            this.calcInput = [result];
        }
        return result;
    }


    linearDoMath() {
        var result = this.calcInput[0];
        var num2;
        var operator = this.lastOperator;

        for (var i = 1; i < this.calcInput.length || this.lastOperator != null; i += 2) {

            operator = this.calcInput[i];
            num2 = this.calcInput[i + 1];

            if (!operator && !num2) {
                operator = this.lastOperator;
                num2 = this.lastNumber;
            } else if (!num2) {
                num2 = result;
            }

            result = this.operatorLogic(result, operator, num2);
            this.lastNumber = num2;
            this.lastOperator = null;
        }
        this.lastOperator = operator;
        return result
    }

    pemdasDoMath() {
        var replaceMathVar;
        var result;
        var i = 1;
        while (i < this.calcInput.length) {
            if (this.calcInput[i] === 'x' || this.calcInput[i] === '÷') {
                replaceMathVar = this.operatorLogic(this.calcInput[i - 1], this.calcInput[i], this.calcInput[i + 1]);
                this.calcInput.splice(i - 1, 3, replaceMathVar);
                i = 1;
            }
            i += 2;
        }
        result = this.linearDoMath(this.calcInput[0]);
        return result;
    }

    operatorLogic(_inputNum1, _operator, _inputNum2) {
        var output;
        var num1 = parseFloat(_inputNum1);
        var num2 = parseFloat(_inputNum2);
        switch (_operator) {
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
                break;
        }
        return output;
    }

}