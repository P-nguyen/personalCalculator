class Calculator {
    constructor() {
        this.view = new View(this);

        this.calcInput = [];
        this.lastNumber = null;
        this.lastOperator = null;
        this.calcState = true;
        this.firstRun = false;
    }

    resetCalculatorVariables() {
        this.calcInput = [];
        this.lastOperator = null;
        this.lastNumber = null;
        this.firstRun = false;

    }

    // toggleCalcState() {
    //     this.calcState = !this.calcState;
    //     this.view.toggleMath(this.calcState);
    // }

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
        return this.view.updateView(this.calcInput);
    }

    handleOperator(_input) {
        if (this.calcInput.length === 0) {
            return
        } else if (isNaN(this.calcInput[this.calcInput.length - 1])) {
            this.calcInput.pop();
        }
        this.calcInput.push(_input);
        return this.view.updateView(this.calcInput);        
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
        return this.view.updateView(result);
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
        return this.view.updateView(this.calcInput);   
    }

    handleParenthesis(_input){
        //check array backwards to see if there is a ( or ) depending on what is clicked
        let parentesisCount = 0;

        if(this.calcInput[this.calcInput.length-1] == '('){
            return;
        }

        for( let i = this.calcInput.length-1 ; i >= 0; i--){
            if( this.calcInput[i] == '(' || this.calcInput[i] == ')' ){
                parentesisCount++;
                if (_input != this.calcInput[i]){
                    this.calcInput.push(_input);
                }
                break;
            }
        }
        if( parentesisCount == 0 && _input == '(' ){
            this.calcInput.push(_input);
        }
        return this.view.updateView(this.calcInput);

    };

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

        if(!output){
            output = 0;
        }

        return output;
    } 

    //will always do math.
    handleEqual() {
        this.doMath()
        debugger;
        return this.view.handleReturn(this.calcInput);
    }

    linearDoMath( _calcInput) {
        var i = 1;

        if (this.lastNumber == null && this.lastOperator === null){
            if( parseFloat(_calcInput[_calcInput.length-1])){
                //if this ends in the number / then don't worry about it.
                this.lastNumber = _calcInput[_calcInput.length-1];
                this.lastOperator = _calcInput[_calcInput.length-2];
            }else{
                //if this ends in an operator then push the number to the end.
                this.lastNumber = _calcInput[_calcInput.length-2];
                this.lastOperator = _calcInput[_calcInput.length-1];
            }   
        }       


        //this needs to check for 3x or 3- or 3+ as well
        if (_calcInput.length === 1 && this.firstRun === true){
            _calcInput.push(this.lastOperator,this.lastNumber);
        }else if ( _calcInput.length === 2){
            this.lastNumber = _calcInput[_calcInput.length-2];
            _calcInput.push(this.lastNumber);
        }

        while(i < _calcInput.length-1){
            
            let operator = _calcInput[i];
            let secondNum = _calcInput[i+1]; //this should only apply if you hit ='s again. otherwise its taken care of in in multiplications.

            let replaceMathVar = this.operatorLogic(_calcInput[i - 1], operator, secondNum);
            _calcInput.splice(i - 1, 3, replaceMathVar);
    
        }
        return _calcInput;
    }

    pemdasDoMath(_calcInput) {
        
        //check the last two numbers after all pemdas math is done.
        if (this.lastNumber == null && this.lastOperator === null){
            if( parseFloat(_calcInput[_calcInput.length-1])){
                //if this ends in the number / then don't worry about it.
                this.lastNumber = _calcInput[_calcInput.length-1];
                this.lastOperator = _calcInput[_calcInput.length-2];
            }
            // else{
            //     //if this ends in an operator then push the number to the end.
            //     this.lastNumber = this.calcInput[this.calcInput.length-2];
            //     this.lastOperator = this.calcInput[this.calcInput.length-1];
            //     this.calcInput.push(this.lastNumber);
            // }
        }

        var i = 1;
        while(i <= _calcInput.length-1){
            if(_calcInput[i] === 'x' || _calcInput[i] === '÷'){
                let secondNum = _calcInput[i+1] ? _calcInput[i+1] : this.lastNumber = _calcInput[i-1];
                if(_calcInput[i+1]){
                    secondNum = _calcInput[i+1];
                }else{
                    secondNum = _calcInput[i-1];
                    this.lastNumber = secondNum;
                    this.lastOperator = _calcInput[i];
                }

                let replaceMathVar = this.operatorLogic(_calcInput[i - 1], _calcInput[i], secondNum);
                _calcInput.splice(i - 1, 3, replaceMathVar);
                i = 1;
            }
            i +=2;
        }

        

        // if(this.lastOperator === 'x' || this.lastOperator === '÷'){
        //     let replaceMathVar = this.operatorLogic(this.calcInput[this.calcInput.length - 2], this.lastOperator, this.lastNumber);
        //     this.calcInput.splice(this.calcInput.length - 2, 2, replaceMathVar);
        // }
        return _calcInput;
    }

    //1+2x3+ = 14 because 1+2x3 = 7 then the + adds another 7. !!! if your add  at the end its needs to add all of it.....
    //["1", "+", "2", "x", "3", "+", "6", "x", "6"] = 43 = 258 ==== 6x
    //2+(2x3) = 8 = 48 ===== it used 6x
    //need to clear lastnumber and operatorer if new input is pressed. //DONE?

    doParenthesis(_calcInput){
        
        let parentesisCheck = false;
        //look through array
        //check to see if you need to close any parentesis

        for (let i = _calcInput.length-1; i>=0; i-- ){
            //if there is a parent then skip this
            if(_calcInput[i] == ')'){
                parentesisCheck = !parentesisCheck;
                break;
            }

            //if there is an open paren then add ) to the end to close it
            if(_calcInput[i] == '('){
                _calcInput.push(')');
                parentesisCheck = !parentesisCheck;
                break;
            }
        }

        //once done then separete all array into new sections to replace

        //while there are still parenthesis
            //search through all and record current paren
            //do math and replace
            //loop.
        var index = 0
        var recorded = [];
        var startParen = null;
        var insideParen = false;

        while(parentesisCheck){

            if( _calcInput[index] == '(' ){
                insideParen = true;
                startParen = index;
                index++;
            }else if (_calcInput[index] == ')'){
                //do and replace math.
                let toRemove = recorded.length + 2;
                recorded = this.pemdasDoMath(recorded);
                recorded = this.linearDoMath(recorded);

                insideParen = false;

                _calcInput.splice(startParen,toRemove,recorded[0]);
                index = 0;
                startParen = null;
            }

            if (insideParen){
                recorded.push(_calcInput[index]);
            }

            index++;
            if( index == _calcInput.length ){parentesisCheck = false;}
        }
    

        //after all is done loop through one more time to see if there are missing operantes
            //if so then insert a * to multiply.
        for (let k = 1; k < _calcInput.length; k+=2){
            if(!isNaN(_calcInput[k])){
                _calcInput.splice(k,0,'x');
            }
        }

        return _calcInput;
    }

    doMath(){

        //()
            //order of operations
        if( this.calcInput[this.calcInput.length-1] == '(' ){
            return this.view.updateView(this.calcInput);
        }else{
            this.calcInput = this.doParenthesis(this.calcInput);
        }


        //order of operations
        if(this.calcInput.length > 3){
            this.calcInput = this.pemdasDoMath(this.calcInput);
        }
        this.calcInput = this.linearDoMath(this.calcInput);
        
        //the rest of the operators
        this.firstRun = true;

        return;
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