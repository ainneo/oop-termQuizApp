//Questions constructer and methods

// ***** constructor function Question blueprint *****
export default function Question (question, choices, answer){
  this.question = question;
  this.choices = choices;
  this.answer = answer
}
// prototype inheritance - add methods to blueprint using blueprints properites
// *** To add a new this.property to a constructor, you must add to 
// constructor function directly*** you can only add permenate prototype properites.
Question.prototype.answerChoice = function(index){
    return index === this.answer; //returns true or false
}

//New question obj example
// const q1 = new Question(
//     "What is 1 + 1?", //questions
//     [2, 3, 4, 5], // choices in a array
//     0 // choose anwser by the idex
// );
// console.log(q1.answerChoice(0)) //this is how we submit the answer