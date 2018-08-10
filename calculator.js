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


    handleAdvanceFeatures(_input){

        //if operator then add
        //if number the change output.
        //need to check type
        let result;

        if ( !isNaN(parseFloat(this.calcInput[this.calcInput.length-1])) ) {
            result = this.AdvanceFeatureOperation(_input, this.calcInput[this.calcInput.length-1] );
            this.calcInput[this.calcInput.length-1] = result;
        }else{
            result = this.AdvanceFeatureOperation(_input);
            this.calcInput.push(result);
        }
        // this.calcInput.push(_input);
        return this.view.updateDisplay(this.calcInput);   
    }

    AdvanceFeatureOperation(_type , _number){
        let output;
        switch (_type) {
            case 'e':
                output = Math.E;
                break;
            case '∏':
                output = Math.PI;
                break;
            case '√':
                output = Math.sqrt(_number);
                break;
            case 'log':
                //base of 10
                output = Math.log(_number) / Math.log(10);
                break;
            case 'ln':
                output = Math.log(_number);
                break;
            case 'sin':
                output = Math.sin(_number);
                break;
            case 'cos':
                output = Math.cos(_number);
                break;
            case 'tan':
                output = Math.tan(_number);
                break;
            case 'sin-1':
                output = Math.asin(_number);
                break;
            case 'cos-1':
                output = Math.acos(_number);
                break;
            case 'tan-1':
                output = Math.atan(_number);
                break;
            case 'ex':
                output = Math.exp(_number);
                break;
            case '10x':
                output = 10;
                for(let i = 1; i < _number; i++ ){ output *= 10 }
                break;
            case 'X2':
                output = _number * _number;
                break;
            case 'x!': //factorials
                output = _number;
                for(let i = _number-1; i >= 1; i--){ output *= i}
                break;
            case '3√x':
                output = Math.pow(_number, 1/3);
                break;
        }

        return output;
    } 

    //will always do math.
    handleEqual() {

        this.doMath()
        return this.view.updateDisplay(this.calcInput[0]);
    }


    linearDoMath() {
        var i = 1;

        if (this.lastNumber == null && this.lastOperator === null){
            if( parseFloat(this.calcInput[this.calcInput.length-1])){
                //if this ends in the number / then don't worry about it.
                this.lastNumber = this.calcInput[this.calcInput.length-1];
                this.lastOperator = this.calcInput[this.calcInput.length-2];
            }else{
                //if this ends in an operator then push the number to the end.
                this.lastNumber = this.calcInput[this.calcInput.length-2];
                this.lastOperator = this.calcInput[this.calcInput.length-1];
            }   
        }       


        //this needs to check for 3x or 3- or 3+ as well
        if (this.calcInput.length === 1){
            this.calcInput.push(this.lastOperator,this.lastNumber);
        }else if ( this.calcInput.length === 2){
            this.calcInput.push(this.lastNumber);
        }

        while(i < this.calcInput.length-1){
            
            let operator = this.calcInput[i];
            let secondNum = this.calcInput[i+1]; //this should only apply if you hit ='s again. otherwise its taken care of in in multiplications.

            let replaceMathVar = this.operatorLogic(this.calcInput[i - 1], operator, secondNum);
            this.calcInput.splice(i - 1, 3, replaceMathVar);
    
        }
    }

    pemdasDoMath() {
        
        //check the last two numbers after all pemdas math is done.
        if (this.lastNumber == null && this.lastOperator === null){
            if( parseFloat(this.calcInput[this.calcInput.length-1])){
                //if this ends in the number / then don't worry about it.
                this.lastNumber = this.calcInput[this.calcInput.length-1];
                this.lastOperator = this.calcInput[this.calcInput.length-2];
            }
            // else{
            //     //if this ends in an operator then push the number to the end.
            //     this.lastNumber = this.calcInput[this.calcInput.length-2];
            //     this.lastOperator = this.calcInput[this.calcInput.length-1];
            //     this.calcInput.push(this.lastNumber);
            // }
        }

        var i = 1;
        while(i <= this.calcInput.length-1){
            if(this.calcInput[i] === 'x' || this.calcInput[i] === '÷'){
                let secondNum = this.calcInput[i+1] ? this.calcInput[i+1] : this.lastNumber = this.calcInput[i-1];
                if(this.calcInput[i+1]){
                    secondNum = this.calcInput[i+1];
                }else{
                    secondNum = this.calcInput[i-1];
                    this.lastNumber = secondNum;
                    this.lastOperator = this.calcInput[i];
                }

                let replaceMathVar = this.operatorLogic(this.calcInput[i - 1], this.calcInput[i], secondNum);
                this.calcInput.splice(i - 1, 3, replaceMathVar);
                i = 1;
            }
            i +=2;
        }

        

        // if(this.lastOperator === 'x' || this.lastOperator === '÷'){
        //     let replaceMathVar = this.operatorLogic(this.calcInput[this.calcInput.length - 2], this.lastOperator, this.lastNumber);
        //     this.calcInput.splice(this.calcInput.length - 2, 2, replaceMathVar);
        // }
    }

    //1+2x3+ = 14 because 1+2x3 = 7 then the + adds another 7. !!! if your add  at the end its needs to add all of it.....
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
        debugger;
        if(this.calcInput.length > 3){
            this.pemdasDoMath();
        }
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