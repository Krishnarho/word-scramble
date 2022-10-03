const wordText = document.querySelector('.word'),
      hintText = document.querySelector('.hint span'),
      timerText = document.querySelector('.timer b'),
      msgText = document.querySelector('.msg'),
      refreshBtn = document.querySelector('.refresh-word'),
      inputField = document.querySelector('input'),
      checkBtn = document.querySelector('.check-word');

let correctWord, timer;

const initTimer = maxTime =>{
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0){
            maxTime--;
            return timerText.innerHTML = maxTime;
        }
        clearInterval(timer);        
        alert( `Times up!! Correct word is ${correctWord.toUpperCase()}`);       
        initGame();
    },1000);
}

const initGame = () => {
    initTimer(45);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for(let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerHTML = wordArray.join("");
    hintText.innerHTML = randomObj.hint;
    timerText.innerHTML = timer
    msgText.innerHTML = "";
    inputField.value = "";    
    correctWord = randomObj.word.toLocaleLowerCase();
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(wordArray,timer);
}
initGame();

const checkWord = () =>{
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) return alert("Please enter a word to check");
    if(userWord != correctWord){ msgText.innerHTML=`Oops!! "${userWord}" is not the correct word..` }
    if(userWord == correctWord){msgText.innerHTML=`Congrates!! "${userWord}" is the correct word..`}
    //initGame();
    console.log(userWord);
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
