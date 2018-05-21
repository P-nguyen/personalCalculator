class Controller {
    constructor() {
        this.calculator = new Calculator();
        this.view = new View(this);
    }

    handleInput(_textInput){
        var result;
        if(!isNaN(_textInput)){
            result = this.calculator.handleNumbers(_textInput);
            this.view.updateDisplay(result);
        }else if(isNaN(_textInput)){//operator

            if(_textInput === 'C' || _textInput ==='CE'){
                result = this.calculator.handleClearButtons(_textInput);
            }else if(_textInput === '=') {
                result = this.calculator.handleEqual(_textInput);
            }else{
                result = this.calculator.handleOperator(_textInput);
            }
            this.view.updateDisplay(result);
        }
    }

    handleToggle(){
        this.calculator.toggleCalcState();
    }

}
var controller = new Controller();