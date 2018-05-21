class Controller {
    constructor() {
        this.calculator = new Calculator();
        this.view = new View;
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
        this.calculator.toggleCalcState();
    }

    handleNumbers(event) {
        var text = event.currentTarget.innerText;
        var result = this.calculator.handleNumbers(text);
        this.view.updateDisplay(result);
    }

    handleOperator(event) {
        var text = event.currentTarget.innerText;
        var result = this.calculator.handleOperator(text);
        this.view.updateDisplay(result);
    }

    handleClearButtons() {
        var text = event.currentTarget.innerText;
        var result = this.calculator.handleClearButtons(text);
        this.view.updateDisplay(result);
    }

    handleEqual() {
        var result = this.calculator.handleEqual();
        this.view.updateDisplay(result);

    }
}
var controller = new Controller();