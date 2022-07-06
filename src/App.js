// CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//import data
import { wordsList } from './data/words'

// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

const guessesQty = 5

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWords, setPickedWords] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])
  const [guessedLetters,setGuessedLetter] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(guessesQty)
  const [score,setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }, [words])

  // start the secret word game
  const startGame = useCallback(() => {
    // clear all letters
    clearLetterStates()


    // pick word and pick category
    const { word, category } = pickWordAndCategory()

    // create an array of letters
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((unity) => unity.toLowerCase())

    //setting states
    setPickedWords(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // verify letter input

  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase()

    // check if letter has already been utilized
    if ( 
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }

    // push guesses letter or remove a guess
    if (letters.includes(normalizedLetter)) {
         setGuessedLetter((actualGuessedLetters) => [
           ...actualGuessedLetters,
           normalizedLetter
         ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
       setGuessedLetter([])
       setWrongLetters([])
  }
      
  useEffect(() =>{
    if (guesses <= 0) {
      // reset all states
      clearLetterStates()
       setGameStage(stages[2].name)
    } 

  },[guesses])
   // check win condition
  useEffect(() => {
    
    const uniqueLetters = [...new Set(letters)]
    
    //win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score 
      setScore((actualScore) => (actualScore += 100))
      //restart
      startGame()
    }

  },[guessedLetters,letters,startGame])

  // restart the game
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && 
      <Game 
      verifyLetter={verifyLetter} 
      pickedWords={pickedWords} 
      pickedCategory={pickedCategory} 
      letters={letters}   
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}           />}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
