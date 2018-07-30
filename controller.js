class Controller {
    constructor() {
        this.calculator = new Calculator();

        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleClearButtons = this.handleClearButtons.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.toggleCalcState = this.toggleCalcState.bind(this);
        this.addEventhandlers();
    }


    addEventToMultiElements( domElements, Func ){
        for (let i = 0; i<domElements.length; i++){
            domElements[i].addEventListener("click", Func);
        }

    }

    addEventhandlers() {
        let numbers = document.querySelectorAll('.numbers .button');
        this.addEventToMultiElements(numbers, this.handleNumbers);

        let operators = document.querySelectorAll('.operators .button');
        this.addEventToMultiElements(operators, this.handleOperator);

        let clearEntry = document.querySelectorAll('.clearEntry .button');
        this.addEventToMultiElements(clearEntry, this.handleClearButtons);

        let equal = document.querySelectorAll('.equal .button');
        this.addEventToMultiElements(equal, this.handleEqual);

        document.getElementById('togglePemdas').addEventListener("click", this.toggleCalcState);

    }

    toggleCalcState() {
        this.calculator.toggleCalcState();
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

}
