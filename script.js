/////////////// Global variable
let score = 0
let timerStart = 59
let round = 1
let countWrong = 0
let countClick = 0
let isGameOver = true
let clickedLetter = []
let boxLetter = document.querySelectorAll(".box")
let imageDraw = document.querySelector(".platform")
let keyboardContainer = document.querySelector(".keyboard")
let audioGame = new Audio("./music/gamesound.mp3")
let gameOver = new Audio("./music/gameover.mp3")
let audioWin = new Audio("./music/win.mp3")

const resetButton = document.querySelector(".reset-btn")
const hintButton = document.querySelector(".hint-btn")
const hintBox = document.querySelector(".hint-sentence")
const scoreDiv = document.querySelector(".score")
const timerDiv = document.querySelector(".timer")
const roundDiv = document.querySelector(".round")
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
    category: "Fruits",
    wordGuess: "BANANA",
    hint: "This yellow curved and take energy.",
  },
  {
    category: "Countries",
    wordGuess: "ITALY",
    hint: "First country to make pizza.",
  },
  {
    category: "Animals",
    wordGuess: "ELEPHANT",
    hint: "The largest animal on land.",
  },
  {
    category: "Fruits",
    wordGuess: "ORANGE",
    hint: "Have many vitamin C if eat it.",
  },
  {
    category: "Countries",
    wordGuess: "OMAN",
    hint: "A GCC with natural landscapes and mountains.",
  },
  {
    category: "Animals",
    wordGuess: "MONKEY",
    hint: "It's eat a lot of banana.",
  },
  {
    category: "Fruits",
    wordGuess: "MELON",
    hint: "Sweet with high water content.",
  },
  {
    category: "Countries",
    wordGuess: "EGYPT",
    hint: "It has many pyramids.",
  },
  {
    category: "Animals",
    wordGuess: "LION",
    hint: "King in the forest.",
  },
  {
    category: "Fruits",
    wordGuess: "APPLE",
    hint: "If you take it, do not visit a doctor.",
  },
  {
    category: "Countries",
    wordGuess: "BAHRAIN",
    hint: "It owns sweets and matai.",
  },
  {
    category: "Animals",
    wordGuess: "DOLPHIN",
    hint: "It lives in the sea and is very intelligent.",
  },
  {
    category: "Fruits",
    wordGuess: "STRAWBERRY",
    hint: "It is red in color and its shape is like a heart.",
  },
  {
    category: "Countries",
    wordGuess: "BAHRAIN",
    hint: "It owns halwa and matai.",
  },
  {
    category: "Animals",
    wordGuess: "HORSE",
    hint: "The tame and fastest animal on land.",
  },
]

for (let i = 0; i < allLetter.length; i++) {
  document.querySelector(".boxes").innerHTML = ""

  const newLetter = document.createElement("span")
  newLetter.setAttribute("class", "letter")
  newLetter.innerText = allLetter[i]
  keyboardContainer.appendChild(newLetter)
}

const keyboard = document.querySelectorAll(".letter")
let randomWord = word[Math.floor(Math.random() * word.length)]
let wordLetter = randomWord.wordGuess

document.querySelector(".category").innerText = randomWord.category
audioGame.play()
audioGame.loop = true
/////////////// Functions
const addNewBox = () => {
  for (let i = 0; i < wordLetter.length; i++) {
    const newBox = document.createElement("span")
    newBox.setAttribute("class", "box")
    document.querySelector(".boxes").appendChild(newBox)
  }
  boxLetter = document.querySelectorAll(".box")
}

const showTimer = () => {
  if (timerStart >= 0) {
    timerDiv.innerText = `⌛Timer: ${timerStart}`
    timerStart--
  } else {
    isGameOver
    stopGame()
  }
}
let times = setInterval(showTimer, 1000)

addNewBox()

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
      scoreDiv.innerText = `🥇Score: ${score}`
      isGameOver = false
      if (score === 3 && !isGameOver) {
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
    if (countWrong === 8 && isGameOver) {
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
  newRound()

  score = 0
  scoreDiv.innerText = `🥇Score: ${score}`
  round = 1
  countClick = 0
  roundDiv.innerText = `🔢Round ${round}`
  imageDraw.setAttribute("src", "./assets/platform-empty.png")
  imageDraw.setAttribute("alt", "gallows-platform")
  keyboardContainer.style.opacity = 1
  hintButton.style.opacity = 1
  hintBox.style.opacity = 0
}

const stopGame = () => {
  clearInterval(times)
  keyboardContainer.style.opacity = 0
  hintButton.style.opacity = 0
  resetButton.style.opacity = 0
  hintBox.style.opacity = 0

  const newBanner = document.createElement("div")
  newBanner.setAttribute("class", "banner")
  const playAgain = document.createElement("a")
  const textBanner = document.createElement("p")
  if (isGameOver) {
    newBanner.classList.add("wrong")
    textBanner.innerText = "Game Over!"
    gameOver.play()
    audioGame.pause()
  } else if (!isGameOver) {
    textBanner.classList.add("winner")
    textBanner.innerText = "Win!!"
    audioWin.play()
    audioGame.pause()
  }
  playAgain.setAttribute("href", "./index.html")
  playAgain.innerText = "Back to home"
  document.querySelector(".category").appendChild(newBanner)
  newBanner.appendChild(textBanner)
  newBanner.appendChild(playAgain)
}

const newRound = () => {
  clearInterval(times)
  times = setInterval(showTimer, 1000)
  audioGame.pause()
  audioGame.play()
  audioGame.loop = true
  timerStart = 60
  isGameOver = true
  round++
  document.querySelector(".boxes").innerHTML = ""
  scoreDiv.innerText = `🥇Score: ${score}`
  roundDiv.innerText = `🔢Round ${round}`
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

/////////////// Events
for (let i = 0; i < keyboard.length; i++) {
  keyboard[i].addEventListener("click", () => {
    clickLetter(i)
  })
}

hintButton.addEventListener("click", () => {
  countClick++

  if (countClick === 1) {
    displayHint()
  } else {
    displayHint()
    hintBox.innerText = "No hint :("
  }
})
resetButton.addEventListener("click", clickReset)
