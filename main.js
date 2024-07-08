// var prompt = require('prompt-sync')();
// const age = prompt("Please enter your age :")
// if(age < 18){
//     console.log("you got a 40% discount !!");
// }else{
//     console.log("you got the 70%");
// }


// ==> Function Composition 
//example
const double = (x) => x * 2;
const square = (x) => x * x;

var output1 = double(2);
var output2 = square(output1);
console.log(output2);

var output_final = square(double(2));
console.log(output_final);