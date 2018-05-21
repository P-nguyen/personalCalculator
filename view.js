class View{
    constructor(){

    }

    updateDisplay(_textToUpdate) {
        // if(!_textToUpdate){ //if its undefined and nothing.
        //     return;
        // }
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