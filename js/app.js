

//initial values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };

  //display in output
  function updateDisplay() {
    let dataOutput = document.querySelector('.output');
    dataOutput.textContent = calculator.displayValue;
    dataOutput.style.fontSize = '40px';
    dataOutput.style.color = 'white'; 
  }
//this brings function to work to show initial value.
  updateDisplay();

//this is the dom element which is parent to go to childones.
let calcWrap = document.querySelector('#calc-wrap');
//event listener to fire event on calculator while clicking.
calcWrap.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }
//it will show how it handles in data operation
  if (target.matches('[data-operation]')) {
    
    handleOperator(target.value);
    
    updateDisplay();
    return;
  }

  if (target.matches('[data-decimal]')) {
    
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.matches('[data-reset]')) {
   
    resetCalculator();
    updateDisplay();
    return;
  }
  if(target.matches('[data-delete]')){
    deleteCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
  
});



  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;
  
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        console.log(calculator)
      // Append the decimal point
      calculator.displayValue += dot;
    }
    if (calculator.displayValue.includes(dot)) {
        if (!calculator.operator===null ){
            calculator.displayValue += dot;
        }
       
      
    }

  }

 
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      console.log(calculator);
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
   
  }

  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    //console.log(calculator);
  }

  function deleteCalculator(){
    calculator.displayValue = '0'; 
  }

  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };


  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  
    
  }