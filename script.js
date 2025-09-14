/////////////// Global variable
let score = 0
let time = "1:00"
const keyboard = document.querySelectorAll(".letter")
const boxLetter = document.querySelectorAll(".box")
const resetButton = document.querySelector(".reset-btn")
const hintButton = document.querySelector(".hint-btn")
const hintBox = document.querySelector(".hint-sentence")
const topLetterKeyboard = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
const middleLetterKeyboard = ["J", "K", "L", "M", "N", "O", "P", "Q", "R"]
const bottomLetterKeyboard = ["S", "T", "U", "V", "W", "X", "Y", "Z"]
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

for (let i = 0; i < topLetterKeyboard.length; i++) {
  const newSpan = document.createElement("span")
  newSpan.setAttribute("class", "letter")
  newSpan.innerText = topLetterKeyboard[i]
  document.querySelector(".top-letters").appendChild(newSpan)
}

for (let i = 0; i < middleLetterKeyboard.length; i++) {
  const newSpan = document.createElement("span")
  newSpan.setAttribute("class", "letter")
  newSpan.innerText = middleLetterKeyboard[i]
  document.querySelector(".middle-letters").appendChild(newSpan)
}

for (let i = 0; i < bottomLetterKeyboard.length; i++) {
  const newSpan = document.createElement("span")
  newSpan.setAttribute("class", "letter")
  newSpan.innerText = bottomLetterKeyboard[i]
  document.querySelector(".bottom-letters").appendChild(newSpan)
}
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

const displayHint = () => {
  let hintForWord = randomWord.hint
  hintBox.innerText = hintForWord
}

const clickReset = () => {
  time = 0
  score = 0
  for (let i = 0; i < clickedLetter; i++) {
    clickedLetter.pop()
  }
  console.log(clickedLetter)
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

hintButton.addEventListener("click", displayHint)
resetButton.addEventListener("click", clickReset)
