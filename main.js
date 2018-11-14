var resizeFunction;
document.addEventListener('DOMContentLoaded', function(event){
     var controller = new Controller();
     resizeFunction = controller.calculator.view.resizedInput;
     document.getElementsByTagName("body")[0].setAttribute("onresize", "resizeFunction()");
});