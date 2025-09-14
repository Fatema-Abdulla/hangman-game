/////////////// Global variable
let score = 0
let time = 0
const keyboard = document.querySelectorAll(".letter")
const boxLetter = document.querySelectorAll(".box")
const reset = document.querySelector(".reset-btn")
const hint = document.querySelector(".hint-btn")
const word = "NORA"
const wordLetter = word.split("")
const clickLetter = []

/////////////// Functions
// put letter to up

const pickUp = (index) => {
  let found = false
  const letterKeyboard = keyboard[index].innerText
  if (wordLetter.includes(letterKeyboard)) {
    for (let i = 0; i < wordLetter.length; i++) {
      if (wordLetter[i] === letterKeyboard) {
        boxLetter[i].innerText = letterKeyboard
        found = true
        if (found && !clickLetter.includes(letterKeyboard)) {
          const correct = (keyboard[index].innerText = "✔️")
          console.log(correct)
          clickLetter.push(keyboard[index].innerText)
        }
      }
    }
  }
  if (!found && !clickLetter.includes(letterKeyboard)) {
    const wrong = (keyboard[index].innerText = "❌")
    console.log(wrong)
    clickLetter.push(keyboard[index].innerText)
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
    pickUp(i)
  })
}
