// ============================================
// TUTORIAL 2-2: CODEDEX CONDITIONALS
// Student: [Your Name]
// Date: [Date]
// ============================================
// --------------------------------------------
// EXERCISE 11: COIN FLIP
// Simulate a coin toss using Math.random()
// Output "Heads" or "Tails"
// --------------------------------------------
let num = Math.random();

if (num > 0.5) {
  console.log("Heads");
} else {
  console.log("Tails");
}
// --------------------------------------------
// EXERCISE 12: GOOD MORNING
// Check if hour < 12
// If true, print morning greeting with routines
// --------------------------------------------
let hour=(9);
if (hour < 12) {
  console.log("Good morning 🌞");
}
// --------------------------------------------
// EXERCISE 13: GOOD AFTERNOON
// Add else clause to Exercise 12
// If hour < 12: morning greeting
// Else: afternoon greeting
// --------------------------------------------
let hours=(16);
if (hours < 12) {
  console.log("Good morning 🌞, brush your teeth!");
} else {
  console.log("Good afternoon ☁️, have a snack and some water!");
}
// --------------------------------------------
// EXERCISE 14: pH LEVELS
// Check if pH is basic, acidic, or neutral
// Use else if for multiple conditions
// --------------------------------------------
let ph=(9);
if (ph > 7) {
  console.log ("Basic");
} else if (ph < 7) {
  console.log ("Acidic");
} else {
  console.log ("neutral");
}
// --------------------------------------------
// EXERCISE 15: MAGIC 8 BALL
// Generate random number 0-8
// Return different responses based on number
// Format: Question / Magic 8 Ball Answer
// --------------------------------------------
let question = "Am I doing okay?";
let answer = Math.floor(Math.random() * 9) + 1;

let answerText = "";
if (answer === 1) {
  answerText = "Yes - definitely.";
} else if (answer === 2) {
  answerText = "It is decidedly so.";
} else if (answer === 3) {
  answerText = "Without a doubt.";
} else if (answer === 4) {
  answerText = "Reply hazy, try again.";
} else if (answer === 5) {
  answerText = "Ask again later.";
} else if (answer === 6) {
  answerText = "Better not tell you now.";
} else if (answer === 7) {
  answerText = "My sources say no.";
} else if (answer === 8) {
  answerText = "Outlook not so good.";
} else if (answer === 9) {
  answerText = "Very doubtful.";
}

console.log("Question: " + question);
console.log("Magic 8 Ball: " + answerText);
// --------------------------------------------
// EXERCISE 16: AIR QUALITY INDEX
// Check AQI ranges using logical operators
// 0-50: Good, 51-100: Moderate, etc.
// --------------------------------------------
let aqi = 75;
if (aqi >= 0 && aqi <= 50) {
  console.log("Good");
} else if (aqi >= 51 && aqi <= 100) {
  console.log("Moderate");
} else if (aqi >= 101 && aqi <= 150) {
  console.log("Unhealthy (Sensitive Groups)");
} else if (aqi >= 151 && aqi <= 200) {
  console.log("Unhealthy");
} else if (aqi >= 201 && aqi <= 300) {
  console.log("Very Unhealthy");
} else {
  console.log("Hazardous");
}
// --------------------------------------------
// EXERCISE 17: ROCK PAPER SCISSORS
// Player picks 0, 1, or 2
// Computer picks random 0-2
// Determine winner using conditionals
// --------------------------------------------
// 0 = Rock, 1 = Paper, 2 = Scissors
let player = 0; // change this to 1 or 2 to pick Paper or Scissors

let computer = Math.floor(Math.random() * 3); // 0, 1, or 2

let playerPick = "";
let computerPick = "";

// Convert numbers to words
if (player === 0) {
  playerPick = "Rock";
} else if (player === 1) {
  playerPick = "Paper";
} else {
  playerPick = "Scissors";
}

if (computer === 0) {
  computerPick = "Rock";
} else if (computer === 1) {
  computerPick = "Paper";
} else {
  computerPick = "Scissors";
}

console.log("Player picked:      " + playerPick);
console.log("Computer picked:    " + computerPick);
console.log(""); // blank line

// Decide winner
if (player === computer) {
  console.log("It's a tie!");
} else if (
  (player === 0 && computer === 2) || // Rock beats Scissors
  (player === 2 && computer === 1) || // Scissors beats Paper
  (player === 1 && computer === 0)    // Paper beats Rock
) {
  console.log("The player won!");
} else {
  console.log("The computer won!");
}
