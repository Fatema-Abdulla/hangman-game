/////////////// Global variable
let score = 0
let time = 0
const keyboard = document.querySelectorAll(".letter")
const boxLetter = document.querySelectorAll(".box")
const reset = document.querySelector(".reset-btn")
const hint = document.querySelector(".hint-btn")
const word = [
  {
    wordGuess: "NORA",
    letters: ["N", "O", "R", "A"],
    hint: "Name of female.",
  },
  {
    wordGuess: "SARA",
    letters: ["S", "A", "R", "A"],
    hint: "Name of female.",
  },
  {
    wordGuess: "CAT",
    letters: ["C", "A", "T"],
    hint: "It's animals.",
  },
  {
    wordGuess: "Dog",
    letters: ["D", "O", "G"],
    hint: "It's animals.",
  },
  {
    wordGuess: "OMAN",
    letters: ["O", "M", "A", "N"],
    hint: "Name of city in GCC.",
  },
  {
    wordGuess: "BAHRAIN",
    letters: ["B", "A", "H", "R", "A", "I", "N"],
    hint: "Name of city in GCC.",
  },
]
const clickedLetter = []
const boxDiv = document.querySelector(".boxes")
/////////////// Functions
const addNewBox = () => {
  let wordLength = false
  if (boxLetter.length < wordLetter.length && wordLength) {
    const newBox = document.createElement("span")
    newBox.setAttribute("class", "box")
    document.querySelector(".boxes").appendChild(newBox)
    wordLength = true
  }
}
let found = false
let randomWord = word[Math.floor(Math.random() * word.length)]
let wordLetter = randomWord.letters
console.log(wordLetter)

const selectLetter = (index) => {
  const letterKeyboard = keyboard[index].innerText
  if (wordLetter.includes(letterKeyboard)) {
    for (let i = 0; i < wordLetter.length; i++) {
      if (wordLetter[i] === letterKeyboard) {
        boxLetter[i].innerText = letterKeyboard
        found = true
        if (found && !clickedLetter.includes(letterKeyboard)) {
          const correct = (keyboard[index].innerText = "✔️")
          console.log(correct)
          clickedLetter.push(correct)
          console.log(clickedLetter)
        }
      }
    }
  }

  if (!found && !clickedLetter.includes(letterKeyboard)) {
    const wrong = (keyboard[index].innerText = "❌")
    console.log(wrong)
    clickedLetter.push(wrong)
  }
}
// check if word similar what add in variable
// increment the score if guess correct and move to other round
// timer is less from 1min to 0
// display the sentence for hint
// draw the man if choose wrong letter

/////////////// Events
for (let i = 0; i < keyboard.length; i++) {
  keyboard[i].addEventListener("click", () => {
    selectLetter(i)
  })
}
