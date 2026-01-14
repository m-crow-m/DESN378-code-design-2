//
// TUTORIAL 1-0: CODEDEX VARIABLES
// Student: JAEDEN CROW
// Date: JAN 13 2026
// ============================================

// --------------------------------------------
// EXERCISE 6: LET & CONST
// Create 4 variables for a user profile:
// - Two const variables 
// - Two let variables 
// Print them all, then reassign one let variable
// --------------------------------------------
const firstName = "Jaeden";
const lastName = "Crow";
let userLocation = "Couch";
let mood = "Anxious";

console.log(firstName);
console.log(lastName);
console.log(userLocation);
console.log(mood);

mood = "tired";
console.log(mood);
// --------------------------------------------
// EXERCISE 7: DATA TYPES
// Create variables for your favorite company:
// 
// Print them all
// --------------------------------------------
let companyName = "subway";
let foundingYear = 1296;
let isActive = true;
let fundingAmount;

console.log(companyName);
console.log(foundingYear);
console.log(isActive);
console.log(fundingAmount);
// --------------------------------------------
// EXERCISE 8: TEMPERATURE
// Convert Spokane's temperature from °F to °C
// Formula: (fahrenheit - 32) / 1.8
// --------------------------------------------
let tempF = 40;
let tempC = (tempF-32) /1.8;

console.log(tempC);
// --------------------------------------------
// EXERCISE 9: TIP CALCULATOR
// Calculate tip and total from a bill
// - billAmount, tipPercent
// - tipAmount = billAmount * (tipPercent / 100)
// - total = billAmount + tipAmount
// --------------------------------------------
let mass = 66;
let height = 1.8;
let bmi = mass / (height ** 2);

console.log(bmi);
// --------------------------------------------
// EXERCISE 10: PLAYLIST DURATION
// Calculate total playlist length
// - numberOfSongs, avgSongLength (in minutes)
// - totalMinutes, hours, remainingMinutes
// Format the output nicely
// --------------------------------------------
const earthWeight = 150;
const moonWeight = earthWeight * 0.38;

console.log("Your weight on Earth is " + earthWeight + " pounds.");
console.log("Your weight on the moon is " + moonWeight + " pounds.");