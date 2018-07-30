class Controller {
    constructor() {
        this.calculator = new Calculator();

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
            this.calculator.handleNumbers(_textInput);
        }else if(isNaN(_textInput)){//operator

            if(_textInput === 'C' || _textInput ==='CE'){
                this.calculator.handleClearButtons(_textInput);
            }else if(_textInput === '=') {
                this.calculator.handleEqual(_textInput);
            }else{
                this.calculator.handleOperator(_textInput);
            }
        }
    }

    handleToggle(){
        this.calculator.toggleCalcState();
    }

}
