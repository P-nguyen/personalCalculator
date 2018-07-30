class View{

    toggleMath(state){
        if (state) {
            document.getElementById('togglePemdas').innerHTML = 'Linear';
        } else {
            document.getElementById('togglePemdas').innerHTML = 'Pemdas';
        }
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
        document.getElementById('input').innerHTML = inputText;

        //updates full line under linear/pemdas
        if (_textToUpdate.length ? _textToUpdate.length : 0 !== 0 && Array.isArray(_textToUpdate)){
            inputText = _textToUpdate.join(' ');
            document.getElementById('inputDisplay').innerHTML = inputText;
        }

    }
}