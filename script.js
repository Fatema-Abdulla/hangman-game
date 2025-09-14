/////////////// Global variable
let boxLetter = document.querySelectorAll(".box")
const resetButton = document.querySelector(".reset-btn")
const hintButton = document.querySelector(".hint-btn")
const hintBox = document.querySelector(".hint-sentence")
const clickedLetter = []
let score = 0
let timer = 0
const allLetter = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]
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

for (let i = 0; i < allLetter.length; i++) {
  const newLetter = document.createElement("span")
  newLetter.setAttribute("class", "letter")
  newLetter.innerText = allLetter[i]
  document.querySelector(".keyboard").appendChild(newLetter)
}
const keyboard = document.querySelectorAll(".letter")
let randomWord = word[Math.floor(Math.random() * word.length)]
let wordLetter = randomWord.letters

/////////////// Functions
const addNewBox = () => {
  const needNewBox = wordLetter.length - boxLetter.length
  for (let i = 0; i < needNewBox; i++) {
    const newBox = document.createElement("span")
    newBox.setAttribute("class", "box")
    document.querySelector(".boxes").appendChild(newBox)
  }
  boxLetter = document.querySelectorAll(".box")
}

addNewBox()
const selectLetter = (index) => {
  let found = false
  const letterKeyboard = keyboard[index].innerText

  if (wordLetter.includes(letterKeyboard)) {
    for (let i = 0; i < wordLetter.length; i++) {
      if (wordLetter[i] === letterKeyboard) {
        boxLetter[i].innerText = letterKeyboard
        found = true
        if (found && !clickedLetter.includes(letterKeyboard)) {
          const correct = (keyboard[index].innerText = "✔️")
          clickedLetter.push(correct)
          console.log(clickedLetter)
        }
      }
    }
  }

  if (!found && !clickedLetter.includes(letterKeyboard)) {
    const wrong = (keyboard[index].innerText = "❌")
    clickedLetter.push(wrong)
    console.log(clickedLetter)
  }
}

const displayHint = () => {
  let hintForWord = randomWord.hint
  hintBox.innerText = hintForWord
}

const clickReset = () => {
  timer = 0
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
