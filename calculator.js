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

    isFloat(_inputNumStr) {// checks to see if number is a float.
        if (isNaN(_inputNumStr)) {
            return false;
        }
        _inputNumStr += 1; // adds 1 to string to make it 1.1
        return _inputNumStr % 1 !== 0;//checks to see if 1.1 is a float.
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

            result = operatorLogic(result, operator, num2);
            this.lastNumber = num2;
            this.lastOperator = null;
        }
        this.lastOperator = operator; // = +
        return result
    }

    pemdasDoMath() {
        var replaceMathVar;
        var result;
        var i = 1;
        while (i < this.calcInput.length) {
            if (this.calcInput[i] === 'x' || this.calcInput[i] === '÷') {
                replaceMathVar = operatorLogic(this.calcInput[i - 1], this.calcInput[i], this.calcInput[i + 1]);
                this.calcInput.splice(i - 1, 3, replaceMathVar);
                i = 1;
            }
            i += 2;
        }
        result = linearDoMath(this.calcInput[0]);
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