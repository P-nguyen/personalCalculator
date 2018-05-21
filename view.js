class View{
    constructor(){
    }

    updateDisplay(_textToUpdate) {
        var inputText = _textToUpdate;

        if(Array.isArray(_textToUpdate)){
            inputText = _textToUpdate[_textToUpdate.length-1];
        }

        if(inputText === Infinity){
            inputText = 'sys error'
        }
        $('#input').text(inputText);

        if (_textToUpdate.length !== 0 && Array.isArray(_textToUpdate)){
            inputText = _textToUpdate.join(' ');
            $('h3').text(inputText);
        }

    }
}