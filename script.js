/////////////// Global variable
let score = 1
let timerStart = 60
let countWrong = 0
const clickedLetter = []
let boxLetter = document.querySelectorAll(".box")
let imageDraw = document.querySelector(".platform")
const resetButton = document.querySelector(".reset-btn")
const hintButton = document.querySelector(".hint-btn")
const hintBox = document.querySelector(".hint-sentence")
const scoreDiv = document.querySelector(".score")
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
]

for (let i = 0; i < allLetter.length; i++) {
  const newLetter = document.createElement("span")
  newLetter.setAttribute("class", "letter")
  newLetter.innerText = allLetter[i]
  document.querySelector(".keyboard").appendChild(newLetter)
}

const keyboard = document.querySelectorAll(".letter")
let randomWord = word[Math.floor(Math.random() * word.length)]
let wordLetter = randomWord.wordGuess

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

const showTimer = () => {
  if (timerStart > 0) {
    document.querySelector(".timer").innerText = `Timer: ${timerStart}`
    timerStart--
  } else {
    document.querySelector(".timer").innerText = `Timer: 0`
  }
}

setInterval(showTimer, 1000)

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
          if (correct) {
            scoreDiv.innerText = `Score: ${score++}`
          }
        }
      }
    }
  }
  if (!found && !clickedLetter.includes(letterKeyboard)) {
    const wrong = (keyboard[index].innerText = "❌")
    clickedLetter.push(wrong)
    if (countWrong < imgList.length) {
      imageDraw.setAttribute("src", imgList[countWrong].src)
      imageDraw.setAttribute("alt", imgList[countWrong].alt)
      countWrong++
    }
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

/////////////// Events
for (let i = 0; i < keyboard.length; i++) {
  keyboard[i].addEventListener("click", () => {
    selectLetter(i)
  })
}

hintButton.addEventListener("click", displayHint)
resetButton.addEventListener("click", clickReset)
