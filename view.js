class View{
    constructor(_calculator){
        this.inputDisplayList = [];
        // this.currentIndex = 0;
        this.calculator = _calculator;
        this.resizedInput = this.resizedInput.bind(this);
    }

    updateView(_textToUpdate){
        var inputText = _textToUpdate;

        if(Array.isArray(_textToUpdate)){
            if (inputText[0] === undefined){
                inputText = ['0'];
            }else {
                inputText = _textToUpdate[_textToUpdate.length - 1];
            }
        }

        if(inputText === "Infinity" || inputText === Infinity || inputText === -Infinity || inputText === "NaN"){
            inputText = ['Sys Error'];
            this.calculator.resetCalculatorVariables();
        }

        this.updateDisplay(inputText);

        //updates full line under linear/pemdas
        // if (_textToUpdate.length ? _textToUpdate.length : false && Array.isArray(_textToUpdate)){
        if (_textToUpdate.length > 1){
            try{ inputText = _textToUpdate.join(' '); 
            }catch(err){}
            this.updateInputDisplay(inputText);
        }else{
            this.updateInputDisplay(inputText);
        }
    }

    updateDisplay(_updateText) {
        document.getElementById('input').innerHTML = _updateText;

    }

    updateInputDisplay(_updateText){
        //empty the div first.
        let inputDisplay = document.getElementById("inputDisplay");
        while(inputDisplay.firstChild){
            inputDisplay.removeChild(inputDisplay.firstChild);
        }

        this.inputDisplayList[0] = _updateText;
        if(this.inputDisplayList.length > 20){
            this.inputDisplayList = this.inputDisplayList.slice(0,20);
        }
        
        //i starts at 1 because 0 is always empty.
        for(let i = 0; i <= 20; i++){
            if(this.inputDisplayList[i] === undefined){
                return;
            }
            let h3Element = document.createElement("h3");
            h3Element.className = "pointer";
            h3Element.innerHTML = this.inputDisplayList[i];
            h3Element.addEventListener( "click", ()=>{this.replaceInputViaController(this.inputDisplayList[i+1])} ); //we add i+1 because it needs to address the empty '' in the new array"....
            inputDisplay.appendChild(h3Element);
        }
    }

    replaceInputViaController(_inputText){
        console.log(this);
        this.updateDisplay(_inputText);
        this.calculator.resetCalculatorVariables();
        try{
            this.calculator.calcInput = _inputText.split(' ');
        }
        catch(err){
        }
        this.inputDisplayList[0] = _inputText;
        
    }

    handleReturn(_calcInput){
        let precision = this.findInputWidth();

        if(!this.inputDisplayList[0] && _calcInput[0] !== "Sys Error" && _calcInput[0] !== undefined){
            this.inputDisplayList[0] = '' + this.inputDisplayList[1] + ' ' + this.calculator.lastOperator + ' ' + this.calculator.lastNumber;
        }

        this.inputDisplayList.unshift('');

        var calcOutput = _calcInput.slice();
        if(!isNaN(calcOutput[0])){
            calcOutput[0] = this.reduceLength(calcOutput[0], precision);
        }else{
            _calcInput[0] = 'Sys Error';
            this.calculator.resetCalculatorVariables();
        }

        this.updateView(calcOutput);
        this.inputDisplayList.unshift('');
    }

    reduceLength( number, precision ){
        // console.log('precision', precision);
        number = number.toPrecision(precision);
        // console.log('TO precision', number);

        number = Number(number);
        // console.log('AFTER Number', number);

        if( number.toString().length > precision){
            number = number.toExponential(precision);
        }
        return number;
    }

    resizedInput(){
        // console.log(this.calculator.calcInput);
        let precision = this.findInputWidth();
        let updatedInput = this.reduceLength(this.calculator.calcInput[0], precision);
        this.updateView(updatedInput);
    }

     findInputWidth(){
        let inputWidth = document.getElementById("input").offsetWidth;
        let precision = 2;
        if(inputWidth < 350){
            precision = 2;
        }else if (inputWidth < 450){
            precision = 6;
        }else if (inputWidth < 1150){
            precision = 9;
        }else{
            precision = 13;
        }

        return precision;
    }

}