class Controller {
    constructor() {
        this.calculator = new Calculator();

        this.handleButtonPress = this.handleButtonPress.bind(this);
        // this.toggleCalcState = this.toggleCalcState.bind(this);
        this.handleAdvance = this.handleAdvance.bind(this);
        this.addEventhandlers();
    }


    addEventToMultiElements( domElements, Func ){
        for (let i = 0; i<domElements.length; i++){
            domElements[i].addEventListener("click", Func);
        }

    }

    addEventhandlers() {
        let numbers = document.querySelectorAll('.numbers .button');
        this.addEventToMultiElements(numbers, this.handleButtonPress);

        let operators = document.querySelectorAll('.operators .button');
        this.addEventToMultiElements(operators, this.handleButtonPress);

        let clearEntry = document.querySelectorAll('.clearEntry .button');
        this.addEventToMultiElements(clearEntry, this.handleButtonPress);

        let equal = document.querySelectorAll('.equal .button');
        this.addEventToMultiElements(equal, this.handleButtonPress);

        let advance = document.querySelectorAll('.extended .button');
        this.addEventToMultiElements(advance, this.handleAdvance);

        let parenthesis = document.querySelectorAll('.parenthesis .button');
        this.addEventToMultiElements(parenthesis, this.handleButtonPress);

    }

    toggleCalcState() {
        this.calculator.toggleCalcState();

    }

    handleButtonPress(event) {
        var text = event.target.innerText;
        this.handleInput(text);
    }    

    handleAdvance(){
        var text = event.currentTarget.innerText;
        text = text.replace( /\r?\n|\r/g , '');
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
            }else if(_textInput === '(' || _textInput === ')'){
                this.calculator.handleParenthesis(_textInput);
            }else if(_textInput === '÷' || _textInput === 'x' || _textInput === '-' || _textInput === '+'){
                this.calculator.handleOperator(_textInput);
            }else{
                this.calculator.handleAdvanceFeatures(_textInput);
            }
        }
    }

}
