class View{
    constructor(_calculator){
        this.inputDisplay = [];
        this.currentIndex = 0;
        this.calculator = _calculator;
    }

    // toggleMath(state){
    //     if (state) {
    //         document.getElementById('togglePemdas').innerHTML = 'Linear';
    //     } else {
    //         document.getElementById('togglePemdas').innerHTML = 'Pemdas';
    //     }
    // }

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

        this.inputDisplay[this.currentIndex] = _updateText;
        for(let i = 0; i <= this.currentIndex; i++){
            let h3Element = document.createElement("h3")
            h3Element.innerHTML = this.inputDisplay[i];
            h3Element.addEventListener( "click", ()=>{this.replaceInputViaController(this.inputDisplay[i])} );
            inputDisplay.appendChild(h3Element);
        }
    }

    replaceInputViaController(_inputText){
        console.log(this);
        this.updateDisplay(_inputText);
        this.calculator.calcInput = _inputText.split(' ');
    }

    handleReturn(_calcInput){
        this.currentIndex +=1;
        this.updateView(_calcInput);
        this.currentIndex +=1;
    }

}