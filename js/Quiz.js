//Quiz constructer and methods

//**** Quiz constructor blue print */
export default function Quiz(lemons){
    this.questions = lemons;//array of questions
    this.score = 0; //init the score at 0
    this.currentIndex = 0; //init index/postion of current question/keep track of current question
};

//method - to get current question index using bracket notation
Quiz.prototype.getCurrentQuestion = function(){
    return this.questions[this.currentIndex]
};
//this.questions = [q1, q2, q3, q4, q5, q6]
//this.currentIndex in the begining is 0 and  will return q1
//return [q1, q2, q3, q4, q5, q6][1] // q2

//method - increment question index to go to the next question
Quiz.prototype.nextIndex= function(){
    this.currentIndex++
};

//method - check when quiz has ended/ quiz ends when currentIndex === questions.length
// we have to check why the quiz has ended bc if there are 5 questions we can not run it 6 times
// index needs to match the questions length...
Quiz.prototype.hasEnded = function(){
    // if(this.currentIndex === this.questions.length){
    //     return true
    // } else {
    //     return flase
    // }  bc === operator returns true or false we don't need the if else statement
    return this.currentIndex === this.questions.length;
};

// method - guess answer, if correct increase score, if wrong do nothing and go to next question
// nextIndex() method moves to the next question
Quiz.prototype.guess = function(userGuess){
  const currentQuestion = this.questions[this.currentIndex];
  if (currentQuestion.answerChoice(userGuess)){
      this.score ++
  }
  this.nextIndex();
};

Quiz.prototype.reset = function() {
    this.score = 0;
    this.currentIndex = 0;
}



