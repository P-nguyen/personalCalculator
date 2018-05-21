class View{
    constructor(controllerHandler){
        this.controller = controllerHandler;
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
        this.controller.handleToggle();
    }

    handleNumbers(event) {
        var text = event.currentTarget.innerText;
        this.controller.handleInput(text);
    }

    handleOperator(event) {
        var text = event.currentTarget.innerText;
        this.controller.handleInput(text);
    }

    handleClearButtons() {
        var text = event.currentTarget.innerText;
        this.controller.handleInput(text);
    }

    handleEqual() {
        var text = event.currentTarget.innerText;
        this.controller.handleInput(text);


    }

    updateDisplay(_textToUpdate) {
        var inputText = _textToUpdate;

        if(Array.isArray(_textToUpdate)){
            if (inputText[0] === undefined){
                inputText = ['0'];
            }else {
                inputText = _textToUpdate[_textToUpdate.length - 1];
            }
        }

        if(inputText === Infinity){
            inputText = 'sys error'
        }
        $('#input').text(inputText);

        //updates full line under linear/pemdas
        if (_textToUpdate.length !== 0 && Array.isArray(_textToUpdate)){
            inputText = _textToUpdate.join(' ');
            $('h3').text(inputText);
        }

    }
}