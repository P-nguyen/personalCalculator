class View{
    constructor(){

    }

    updateDisplay(_textToUpdate) {
        var inputText = _textToUpdate
        if(inputText === Infinity){
            inputText = 'sys error'
        }
        $('#input').text(inputText);

        // if (this.calcInput.length !== 0){
        //     inputText = this.calcInput.join(' ');
        // }
        // $('h3').text(inputText);
    }
}