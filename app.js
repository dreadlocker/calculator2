window.onload = function () {
  window.addEventListener('keydown', enterClicked);

  const input = document.getElementsByTagName('input')[0];

  function enterClicked() {
    if (event.keyCode !== 13) return;
    equalBtnClicked();
  }

  const equalBtn = document.getElementById('equal');
  equalBtn.addEventListener('click', equalBtnClicked);

  const result = document.getElementById('result');
  function equalBtnClicked() {
    let inputStr = input.value.trim();
    const numbersArr = inputStr.match(/\d+(\.\d+)?/g);

    const checkPassed = isUserInputValid(inputStr, numbersArr);

    if (checkPassed) {
      if (inputStr.charAt(0) === '+') inputStr = inputStr.slice(1);

      const operandsSortedArr = [
        ...(inputStr.match(/\//g) || ""),
        ...(inputStr.match(/\*/g) || ""),
        ...(inputStr.match(/\+/g) || ""),
        ...(inputStr.match(/\-/g) || "")
      ];
  
      if(inputStr.charAt(0) !== '-' && operandsSortedArr.length >= numbersArr.length) return [result.innerHTML = 'NaN', clearUserInput()];
  
      for (let i = 0; i < operandsSortedArr.length; i++) {
        const operand = operandsSortedArr[i];
        const regex = new RegExp('([-]?\\d+(\\.\\d+)?)\\' + operandsSortedArr[i] + '(\\d+(\\.\\d+)?)', 'g');
        const arrFromStr = regex.exec(inputStr);
        if (operand === '/') inputStr = inputStr.replace(arrFromStr[0], (+arrFromStr[1]) / (+arrFromStr[3]));
        if (operand === '*') inputStr = inputStr.replace(arrFromStr[0], (+arrFromStr[1]) * (+arrFromStr[3]));
        if (operand === '+') inputStr = inputStr.replace(arrFromStr[0], (+arrFromStr[1]) + (+arrFromStr[3]));
        if (operand === '-') {
          if (arrFromStr !== null) {
            inputStr = inputStr.replace(arrFromStr[0], (+arrFromStr[1]) - (+arrFromStr[3]));
          }
        }
      }
  
      clearUserInput();
      const number = parseFloat(inputStr);
      if (number % 1 === 0) return result.innerHTML = number;
      result.innerHTML = number.toFixed(2);
    }
  }

  function isUserInputValid(inputStr, numbersArr) {
    if(numbersArr === null) {
      result.innerHTML = 'NaN';
      clearUserInput();
      return false;
    } 

    if (inputStr === '') {
      clearUserInput()
      return false;
    }

    if (numbersArr !== null && numbersArr.length < 2) {
      result.innerHTML = 'NaN';
      clearUserInput();
      return false;
    }
    
    const haveLetters = inputStr.match(/[a-zA-Z]/g);
    if (haveLetters !== null) {
      result.innerHTML = 'NaN';
      clearUserInput();
      return false;
    }
    
    return true;
  }

  const clearBtn = document.getElementById('clear');
  clearBtn.addEventListener('click', clearUserInput);

  function clearUserInput() {
    input.value = '';
    input.focus();
  }

  const calcBtns = document.getElementsByClassName('buttons');
  for (let i = 0; i < calcBtns.length; i++) {
    const btn = calcBtns[i];
    btn.addEventListener('click', calcBtnsClicked);
  }

  function calcBtnsClicked() {
    input.value += this.innerHTML;
  }
};