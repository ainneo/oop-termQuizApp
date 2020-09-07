// es6 modules, uses one main js file to be linked to the DOM, then importants other functions and components 
// from other js files to main file, therefore only needing to link one js file to the HTML DOM.
import Question from "./Questions.js"; //Questions constructer es5
import Quiz from "./Quiz.js"; // Quiz constructor es5




//CACHING DOM - putting all DOM elem we need in variables so we don't have to keep writing document.querySelector every single time, 
//unless - there are some cases when we need to get an elem at a specific time, or if its a dynamic elem.
//Our App is incased in a IFFE
const App = (() => {
    const quizEl = document.querySelector(".section-wrapper");
    const questionEl = document.querySelector(".questions");
    const trackerEl = document.querySelector(".questions-tracker");
    const progressBarEl = document.querySelector(".progressBarInner");
    const taglineEl = document.querySelector(".tagline");
    const choicesEl = document.querySelector(".choices");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");
    // console.log(questionEl)//test

    

    //NEW OBJ instances q1..., of Question constructer
const q1 = new Question(
     "How do you change directories in terminal?",
     ["a", "cd", "ls", "bb"],
     1
);
const q2 = new Question(
    "Which command lists contents of a directory?",
    ["ls", "cd ..", "help", "touch"],
    0
);
const q3 = new Question(
    "Which command opens a file?",
    ["open", "file", "code.", "atom."],
    0
);
const q4 = new Question(
    "which command renames a file?",
    ["oop", "file", "mv", "name"],
    1
);
const q5 = new Question(
    "Which command removes an empty directory?",
    ["rm", "init", "rmdir", "clear"],
    2
);
const q6 = new Question(
    "which command clears the terminal screen?",
    ["clean", "blank", "clear", "erase"],
    2
);

const qArray = [q1, q2, q3, q4, q5, q6];
// console.table([q1, q2, q3, q4, q5, q6]) //test


//NEW OBJ instance ..., of Quiz constructor
const myQuiz = new Quiz(qArray);
// console.log(myQuiz)//test
// myQuiz.nextIndex(); //this line is going to be running when the next button is clicked
// console.log(myQuiz.getCurrentQuestion())



//BUTTON METHODS - add listners to button
const listeners = _ => {
  nextButtonEl.addEventListener("click", function(){
    //console.log("clicked next"); //test
    const selectedRadioEl = document.querySelector('input[name="choice"]:checked')
    if(selectedRadioEl){
      const key = Number(selectedRadioEl.getAttribute("data-order"));
      myQuiz.guess(key);
      renderAll()
    }//if true then render all, if else(false) do nothing
    // console.log(selectedRadioEl)//test
  })

  restartButtonEl.addEventListener("click", function(){
    //   console.log("clicked restart") //test
    //1. reset quiz
    myQuiz.reset();
    //2. renderAll again
    renderAll();
    //3. restore the next btton
    restartButtonEl.style.opacity = 0;
  })
}



//RENDING METHOD COMPONENTS - rendering to DOM
//create a innerHTM function since it is going to be used alot inside render methods
const setValue = (elem, text) =>{
    elem.innerHTML = text;
};

const renderQuestion = _ =>{
  const question = myQuiz.getCurrentQuestion().question; //get question
// questionEl.innerHTML = question //renders question to the DOM
  setValue(questionEl, question) //renders using function above
// console.log(question)//test
};

//we need to render each li tag (choice) dynamically
const renderChoices = _ =>{
   let markup = ""; //init empty string 
   const currentChoices = myQuiz.getCurrentQuestion().choices;//get choices 
   currentChoices.forEach((elem, index) => {
    //  console.log(elem, index) //test
     markup += `
     <li class="choice">
        <input data-order="${index}" id="choice${index}" type="radio" name="choice" class="input">
        <label for="choice${index}" class="label">
            <i></i>
            <p>${elem}</p>
        </label>
    </li>
     `
 });
 choicesEl.innerHTML = markup //renders choices to the DOM
};

const renderTracker = _ =>{
    const index = myQuiz.currentIndex 
    // console.log(index)//test
    trackerEl.innerHTML = `${index+1} of ${myQuiz.questions.length}`;
};



// to render a progress bar you need 2 functions:
    const getPercentage =(num1, num2) => {
        return Math.round((num1/num2) * 100);
    };

    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(function(){
            if(width > maxPercent) {
                clearInterval(loadingBar)
            }else{
                width++;
                progressBarEl.style.width = width + "%"
            }
        }, 3)
    }
//run both progress bar functions under one render function
    const renderProgress = _ => {
      //1. get width
      const currentWidth = getPercentage(myQuiz.currentIndex, myQuiz.questions.length)
      // console.log(currentWidth)//test
      //2. create function (0, width)
      launch(0, currentWidth)
    };

    const renderEndScreen = _ => {
        setValue(questionEl, `All Done!`);
        setValue(taglineEl, `Complete`);
        setValue(trackerEl, `your score: ${getPercentage(myQuiz.score, myQuiz.questions.length)}`);
        nextButtonEl.style.opacity = 0;//nextButton.destroy  - but opacity perserves it for later use
        renderProgress();
    }



const renderAll = _ => {
    if (myQuiz.hasEnded()) {
        renderEndScreen();
    }else{
        //1.render the question
        renderQuestion();
        //2.render the choices elements
        renderChoices();
        //3.render the tracker
        renderTracker();
        //4. render Progress
        renderProgress()
    }
  };
 //revealing the public methods on return
 //renderLemons on left is the public method, and the renderAll on right is private method
 //public method:privite method
  return{
    renderLemons:renderAll,
    listenersLemons:listeners
  }
})();
App.renderLemons();
App.listenersLemons();








//NOTES:
//Revealing Module Pattern ()
//wrap our methods in a IFFE, keeping them private...
//public methods are returned
// const App = (function() {
//     //init count to 0 -private method
//     let counter = 0;
//     //adds double to counter 
//     const doubleCounter = () => {
//         counter *=2;
//     } 
//     //adds to counter -private method
//     const increCounter = () => {
//         counter ++
//     };
//     //return counter -private method
//     const getCounter = () => {
//         return counter;
//     };
//     //set counter -private method
//     const setCounter = (newNum) => {
//         counter = newNum
//     };
//     //reveal the public methods 
//     // that why this is called revealing module pattern
//     return {
//        get: getCounter,
//        set: setCounter
//     }
// })();

// console.log(App.get()) //0

// App.set(2)
// console.log(App.get())// 2





