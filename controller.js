class Controller {
    constructor() {
        this.calculator = new Calculator();
        this.view = new View();

        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleClearButtons = this.handleClearButtons.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.toggleCalcState = this.toggleCalcState.bind(this);
        this.initializeCalc();
    }

    initializeCalc() {
        $(document).ready(this.addEventhandlers.bind(this));
    }

    addEventhandlers() {
        $('.numbers .button').on('click', this.handleNumbers);
        $('.operators .button').on('click', this.handleOperator);
        $('.clearEntry .button').on('click', this.handleClearButtons);
        $('.equal .button').on('click', this.handleEqual);
        $('#togglePemdas').on('click', this.toggleCalcState);
    }

    toggleCalcState() {
        this.handleToggle();
    }

    handleNumbers(event) {
        var text = event.currentTarget.innerText;
        this.handleInput(text);
    }

    handleOperator(event) {
        var text = event.currentTarget.innerText;
        this.handleInput(text);
    }

    handleClearButtons() {
        var text = event.currentTarget.innerText;
        this.handleInput(text);
    }

    handleEqual() {
        var text = event.currentTarget.innerText;
        this.handleInput(text);
    }


    handleInput(_textInput){
        var result;
        if(!isNaN(_textInput) || _textInput === '.'){ // takes in '.' with numbers.
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
