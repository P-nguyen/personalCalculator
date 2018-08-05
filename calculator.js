class Calculator {
    constructor() {
        this.view = new View();

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
        this.view.toggleMath(this.calcState);
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
        return this.view.updateDisplay(this.calcInput);
    }

    handleOperator(_input) {
        if (this.calcInput.length === 0) {
            return
        } else if (isNaN(this.calcInput[this.calcInput.length - 1])) {
            this.calcInput.pop();
        }
        this.calcInput.push(_input);
        return this.view.updateDisplay(this.calcInput);        
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
        return this.view.updateDisplay(result);
    }

    //will always do math.
    handleEqual() {
        var result;

        this.doMath()
        return this.view.updateDisplay(this.calcInput[0]);
    }


    linearDoMath() {
        var i = 1;

        //this needs to check for 3x or 3- or 3+ as well
        if (this.calcInput.length === 1){
            this.calcInput.push(this.lastOperator,this.lastNumber);
        }else if ( this.calcInput.length === 2){
            this.calcInput.push(this.lastNumber);
        }

        while(i < this.calcInput.length-1){
            
            let operator = this.calcInput[i];
            let secondNum = this.calcInput[i+1]; //this should only apply if you hit ='s again. otherwise its taken care of in in multiplications.

            let replaceMathVar = this.operatorLogic(this.calcInput[i - 1], this.calcInput[i], secondNum);
            this.calcInput.splice(i - 1, 3, replaceMathVar);
    
        }
    }

    pemdasDoMath() {
        //check the last two numbers.
        if (this.lastNumber == null && this.lastOperator === null){
            if( parseFloat(this.calcInput[this.calcInput.length-1])){
                this.lastNumber = this.calcInput[this.calcInput.length-1];
                this.lastOperator = this.calcInput[this.calcInput.length-2];
            }else{
                this.lastNumber = this.calcInput[this.calcInput.length-2];
                this.lastOperator = this.calcInput[this.calcInput.length-1];
            }
        }
        
        //store for ='s we only care about after ()'s the last number. if its an operators then save the one before.
        var i = 1;
        while(i < this.calcInput.length-1){
            if(this.calcInput[i] === 'x' || this.calcInput[i] === '÷'){
                let secondNum = this.calcInput[i+1] ? this.calcInput[i+1] : this.calcInput[i-1];
                let replaceMathVar = this.operatorLogic(this.calcInput[i - 1], this.calcInput[i], secondNum);
                this.calcInput.splice(i - 1, 3, replaceMathVar);
                i = 1;
            }
            i +=2;
        }
    }

    //["1", "+", "2", "x", "3", "+", "6", "x", "6"] = 43 = 258 ==== 6x
    //2+(2x3) = 8 = 48 ===== it used 6x
    //need to clear lastnumber and operatorer if new input is pressed. //DONE?

    checkParenthesis(){
        //look through array
        //if left( is found then look for right) and do math here first and replace.
    }

    doMath(){
        //()
            //order of operations

        //order of operations
        this.pemdasDoMath();
        debugger;
        this.linearDoMath();
        //the rest of the operators
        debugger;
 
    }
    //1+2 x = 5

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