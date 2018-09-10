class View{
    constructor(_calculator){
        this.inputDisplayList = [];
        // this.currentIndex = 0;
        this.calculator = _calculator;
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

        if(inputText === Infinity){
            inputText = 'sys error'
        }
        this.updateDisplay(inputText);

        //updates full line under linear/pemdas
        if (_textToUpdate.length ? _textToUpdate.length : false && Array.isArray(_textToUpdate)){
            let inputText = _textToUpdate.join(' ');
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
            if(!this.inputDisplayList[i]){
                return;
            }
            let h3Element = document.createElement("h3");
            h3Element.innerHTML = this.inputDisplayList[i];
            h3Element.addEventListener( "click", ()=>{this.replaceInputViaController(this.inputDisplayList[i+1])} ); //we add i+1 because it needs to address the empty '' in the new array"....
            inputDisplay.appendChild(h3Element);
        }
    }

    replaceInputViaController(_inputText){
        console.log(this);
        this.updateDisplay(_inputText);
        this.calculator.resetCalculatorVariables();
        this.calculator.calcInput = _inputText.split(' ');
        this.inputDisplayList[0] = _inputText;
        
    }

    handleReturn(_calcInput){
        debugger;
        if(!this.inputDisplayList[0]){
            this.inputDisplayList[0] = '' + this.inputDisplayList[1] + ' ' + this.calculator.lastOperator + ' ' + this.calculator.lastNumber;
        }
        this.inputDisplayList.unshift('');
        this.updateView(_calcInput);
        this.inputDisplayList.unshift('');
    }

}