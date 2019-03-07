import "@babel/polyfill";
require("../scss/main.scss");

window.onload = function() {
  let userInput = document.getElementById("user-input");
  let checkBtn = document.getElementById("check-btn");
  let infoIcon = document.querySelector(".fa-question-circle");

  checkBtn.onclick = handleUserInput; //gets input value and triggers palindrom check based on check mode
  userInput.onkeypress = keyPressCheck; //if enter is pressed after writing in input, triggers click on checkBtn
  infoIcon.onclick = toggleInfoDiv; //toggles check mode info text

  function handleUserInput() {
    let userInput = document.getElementById("user-input").value; //original input for check mode 2
    let copyRespectSpaces = userInput.replace(/\s/g, "&nbsp;"); //innerHTMl doesnt' save multiple spaces, it concats them into one=>keeping a copy with non breaking space
    let cleanInput = userInput.toLowerCase().replace(/[\W_\s]/g, ""); //non-chars excluded for check mode 1
    let checkBtn = document.getElementById("check-btn");
    let infoToggleSwitch = document.getElementById("info-toggle-switch"); //toggles check modes
    let palCheck; //will store returned value from palindrom function

    toggleActive(checkBtn); //mimics active pseudoclass when enter is pressed on button instead of mouse click

    if (!infoToggleSwitch.checked) {
      //check mode 1 corresponds to input not checked
      palCheck = palindrome(cleanInput);
    } else {
      palCheck = palindrome(userInput.toLowerCase()); //check mode 2 corresponds to input checked
    }

    displayMessage(palCheck, copyRespectSpaces); //displays result of palindrom check
  }

  function toggleActive(checkBtn) {
    //active pseudo-class cannot be activated from js, need to toggle separate active class to show button click effect on keypress
    checkBtn.classList.remove("btn-primary");
    checkBtn.classList.add("activeBtn");
    checkBtn.children[0].innerHTML = "Check!";
    setTimeout(() => {
      checkBtn.classList.remove("activeBtn"); //adding active classes and removing them with delay to mimic button being clicked
      checkBtn.classList.add("btn-primary");
      checkBtn.children[0].innerHTML = "Palindrome?";
    }, 200);
  }

  function palindrome(str) {
    // for loop palindrom check runs faster than string=string reverse join way of checking :)
    let len = str.length;
    for (let i = 0; i < len / 2; i++) {
      if (str[i] !== str[len - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  function displayMessage(palCheck, copyRespectSpaces) {
    let resultMessage = document.getElementById("result-text");
    let userWord = document.getElementById("user-word");

    if (palCheck) {
      userWord.innerHTML = `"${copyRespectSpaces}"`;
      resultMessage.innerHTML = ` is a palindrome`;
    } else {
      userWord.innerHTML = `"${copyRespectSpaces}"`;
      resultMessage.innerHTML = ` is not a palindrome`;
    }
  }

  function keyPressCheck(e) {
    let checkBtn = document.getElementById("check-btn");

    if (e.keyCode === 13) {
      toggleActive(checkBtn); //mimics active pseudoclass when enter is pressed on input
      checkBtn.click(); //triggers click event on checkBtn
    }
  }

  function toggleInfoDiv() {
    let infoDiv = document.getElementById("info-div");

    if (getComputedStyle(infoDiv).visibility == "hidden") {
      infoDiv.style.visibility = "visible";
    } else {
      infoDiv.style.visibility = "hidden";
    }
  }
};
