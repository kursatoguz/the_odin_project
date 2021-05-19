
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const operand = document.getElementById("operand");
const result = document.getElementById("result");

var operator = "";
var prevOperand,nextOperand;
var temp;

callEventListeners();

  function compute() {
    
      var splited = operand.innerHTML.split(`${operator}`);
      prevOperand = splited[0];
      nextOperand = splited[1];      
      if (nextOperand == ""){
          return;
      }
      if(operator == "" ){
          result.innerHTML = operand.innerHTML;
      }
      if (operator == "+"){
          result.innerHTML = parseFloat(prevOperand)+parseFloat(nextOperand);
          display();
     }
      if (operator == "-"){
            result.innerHTML = parseFloat(prevOperand)-parseFloat(nextOperand);
            display();
        }
      if (operator == "*"){
            result.innerHTML = parseFloat(prevOperand)*parseFloat(nextOperand);
            display();
        }
      if (operator == "÷"){
            result.innerHTML = parseFloat(prevOperand)/parseFloat(nextOperand);
            display();
        }

}
function clear(){
    operand.innerHTML = "";
    operator.innerHTML = "";
    result.innerHTML = "";
}
function deleteNum() {
    
    if (operand.innerHTML == result.innerHTML) {
        operator = temp;
       operand.innerHTML = `${prevOperand}${operator}${nextOperand}`;
       
    }
    else{
    operand.innerHTML = operand.innerHTML.slice(0,operand.innerHTML.length-1);
        //Check operator deleted or not
        if(!operand.innerHTML.includes(operator)){
            operator = "";
        }
    }
        
}
function display() {
    temp = operator; // will be used in deleteNum
    operand.innerHTML = result.innerHTML;
    operator = "";
   
}
function callEventListeners() {
    equalsButton.addEventListener("click",compute);
    allClearButton.addEventListener("click",clear);
    deleteButton.addEventListener("click",deleteNum);
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        operand.innerHTML += button.innerHTML;
        enableOperationButton();
    });
  });
  
  operationButtons.forEach((button) => {
    
      button.addEventListener("click", () => {
          if(operator != ""){
              compute();
              operator = button.innerHTML;
          }
          else{
         
                
                operator = button.innerHTML;
          }
         disableOperationButton();
         operand.innerHTML += button.innerHTML
      })
  });
  
  function disableOperationButton() {
    operationButtons.forEach((button) =>{button.disabled = true;})
  }
  function enableOperationButton() {
    operationButtons.forEach((button) =>{button.disabled = false;})
  }