///// Global variable
let score = 0
let timerStart = 239
let round = 1
let countWrong = 0
let countClick = 0
let isGameOver = true
let clickedLetter = []
let boxLetter = document.querySelectorAll(".box")
let imageDraw = document.querySelector(".platform")
let keyboardContainer = document.querySelector(".keyboard-ar")
let audioGame = new Audio("./music/gamesound.mp3")
let gameOver = new Audio("./music/gameover.mp3")
let audioWin = new Audio("./music/win.mp3")

const muteButton = document.querySelector(".mute-btn")
const resetButton = document.querySelector(".reset-btn")
const hintButton = document.querySelector(".hint-btn")
const hintBox = document.querySelector(".hint-sentence")
const scoreDiv = document.querySelector(".score")
const timerDiv = document.querySelector(".timer")
const roundDiv = document.querySelector(".round")

// word guess
import { word } from "./words-arabic.js"

// image for draw man
const imgList = [
  {
    src: "./assets/Face.png",
    alt: "first wrong",
  },
  {
    src: "./assets/body.png",
    alt: "second wrong",
  },
  {
    src: "./assets/aram-right.png",
    alt: "third wrong",
  },
  {
    src: "./assets/aram-left.png",
    alt: "four wrong",
  },
  {
    src: "./assets/leg-right.png",
    alt: "five wrong",
  },
  {
    src: "./assets/leg-left.png",
    alt: "six wrong",
  },
  {
    src: "./assets/eye-right.png",
    alt: "seven wrong",
  },
  {
    src: "./assets/eye-left.png",
    alt: "eight wrong",
  },
]

// letter on keyboard
const allLetter = [
  "أ",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
  "ء",
  "ا",
]

//display the letter in array
for (let i = 0; i < allLetter.length; i++) {
  document.querySelector(".boxes-ar").innerHTML = ""

  const newLetter = document.createElement("span")
  newLetter.setAttribute("class", "letter")
  newLetter.innerText = allLetter[i]
  keyboardContainer.appendChild(newLetter)
}

const keyboard = document.querySelectorAll(".letter")
//Random words appear
let randomWord = word[Math.floor(Math.random() * word.length)]
let wordLetter = randomWord.wordGuess
document.querySelector(".category").innerText = randomWord.category

audioGame.muted = true

///// Functions
const addNewBox = () => {
  for (let i = 0; i < wordLetter.length; i++) {
    const newBox = document.createElement("span")
    newBox.setAttribute("class", "box")
    document.querySelector(".boxes-ar").appendChild(newBox)
  }
  boxLetter = document.querySelectorAll(".box")
}

const showTimer = () => {
  if (timerStart >= 0) {
    timerDiv.innerText = `الوقت: ${timerStart}⌛`
    timerStart--
  } else {
    isGameOver
    stopGame()
  }
}
let times = setInterval(showTimer, 1000)

addNewBox() // I call the function to change the number of box before click the letter

const clickLetter = (index) => {
  let found = false
  const letterKeyboard = keyboard[index].innerText

  if (wordLetter.includes(letterKeyboard)) {
    for (let i = 0; i < wordLetter.length; i++) {
      if (wordLetter[i] === letterKeyboard) {
        boxLetter[i].innerText = letterKeyboard
        found = true
        if (found && !clickedLetter.includes(letterKeyboard)) {
          keyboard[index].innerText = "✔️"
          clickedLetter.push(letterKeyboard)
        }
      }
    }
    let countFilledBox = 0
    for (let k = 0; k < boxLetter.length; k++) {
      if (boxLetter[k].innerText !== "") {
        countFilledBox++
      }
    }
    if (countFilledBox === boxLetter.length) {
      score += 1
      scoreDiv.innerText = `النتيجة: ${score}🥇`
      if (score === 10) {
        isGameOver = false
        stopGame()
        return
      }
      newRound()
    }
  }
  if (!found && !clickedLetter.includes(letterKeyboard)) {
    keyboard[index].innerText = "❌"
    clickedLetter.push(letterKeyboard)
    if (countWrong < imgList.length) {
      imageDraw.setAttribute("src", imgList[countWrong].src)
      imageDraw.setAttribute("alt", imgList[countWrong].alt)
      countWrong++
    }
    if (countWrong === 8) {
      isGameOver
      stopGame()
    }
  }
}

const displayHint = () => {
  let hintForWord = randomWord.hint
  hintBox.innerText = hintForWord
  hintBox.style.opacity = 1
}

const clickReset = () => {
  newRound() // I call the function newRound to avoid repeating the code twice

  score = 0
  scoreDiv.innerText = `النتيجة: ${score}🥇`
  round = 1
  countClick = 0
  roundDiv.innerText = `الجولة ${round}🔢`
  imageDraw.setAttribute("src", "./assets/platform-empty.png")
  imageDraw.setAttribute("alt", "gallows-platform")
  keyboardContainer.style.opacity = 1
  hintButton.style.opacity = 1
  hintBox.style.opacity = 0
}

const stopGame = () => {
  clearInterval(times)
  keyboardContainer.style.pointerEvents = "none"
  hintButton.style.pointerEvents = "none"
  resetButton.style.pointerEvents = "none"
  muteButton.style.pointerEvents = "none"
  hintBox.style.pointerEvents = "none"

  const newBanner = document.createElement("div")
  newBanner.setAttribute("class", "banner")
  const playAgain = document.createElement("a")
  const textBanner = document.createElement("p")
  if (isGameOver) {
    newBanner.classList.add("wrong")
    textBanner.innerText = "!خسارة"
    gameOver.play()
    audioGame.pause()
  } else if (!isGameOver) {
    textBanner.classList.add("winner")
    textBanner.innerText = "!فوز"
    audioWin.play()
    audioGame.pause()
  }
  playAgain.setAttribute("href", "./index.html")
  playAgain.innerText = "العودة إلى الصفحة الرئيسية"
  document.querySelector(".category").appendChild(newBanner)
  newBanner.appendChild(textBanner)
  newBanner.appendChild(playAgain)
}

const newRound = () => {
  clearInterval(times)
  times = setInterval(showTimer, 1000)
  audioGame.pause()
  audioGame.currentTime = 0
  audioGame.play()
  audioGame.loop = true

  timerStart = 240
  isGameOver = true
  round++
  document.querySelector(".boxes-ar").innerHTML = ""
  scoreDiv.innerText = `النتيجة: ${score}🥇`
  roundDiv.innerText = `الجولة ${round}🔢`
  for (let i = 0; i < boxLetter.length; i++) {
    boxLetter[i].innerText = ""
  }
  for (let j = 0; j < keyboard.length; j++) {
    keyboard[j].innerText = allLetter[j]
  }
  imageDraw.setAttribute("src", "./assets/platform-empty.png")
  imageDraw.setAttribute("alt", "gallows-platform")
  countWrong = 0
  clickedLetter = []
  hintBox.style.opacity = 0

  randomWord = word[Math.floor(Math.random() * word.length)]
  wordLetter = randomWord.wordGuess
  addNewBox()
  document.querySelector(".category").innerText = randomWord.category
}

///// Events
for (let i = 0; i < keyboard.length; i++) {
  keyboard[i].addEventListener("click", () => {
    clickLetter(i)
  })
}

hintButton.addEventListener("click", () => {
  countClick++

  // not display hint more then one in game
  if (countClick <= 8) {
    displayHint()
  } else {
    displayHint()
    hintBox.innerText = "No hint :("
  }
})

muteButton.addEventListener("click", () => {
  if (audioGame.muted) {
    muteButton.innerText = "🔉"
    audioGame.play()
    audioGame.muted = false
    audioGame.loop = true
  } else {
    muteButton.innerText = "🔇"
    audioGame.pause()
    audioGame.muted = true
  }
})

resetButton.addEventListener("click", clickReset)
