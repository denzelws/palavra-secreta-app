import { useState, useRef } from 'react'
import './Game.css'

const Game = ({
  verifyLetter, 
  pickedWords, 
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
   
   const [letter,setLetter] = useState('')
   const letterInputRef = useRef(null)

   const handleSubmit = (e) => {
    e.preventDefault()
    verifyLetter(letter)
    setLetter('')
    letterInputRef.current.focus()
   }

   return (
   <div className="game">
    <div className="points">
      <span>{score}</span>
    </div>
    <h1>Adivinhe a palavra</h1>
    <h3 className="tip">
      Dica sobre a palavra: <span>{pickedCategory}</span>
    </h3>
    <p>Você ainda tem {guesses} tentativas</p>
    <div className="wordContainer">
      {letters.map((letter, id) => (
        guessedLetters.includes(letter) ? (
          <span key={id} className='letter'>
            {letter}
          </span>
        ) : (
          <span key={id} className='blankSpace'></span>
        )
      ))}
    </div>
    <div className="letterContainer">
      <p>Tente adivinhar a palavra</p>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        name="letter" 
        maxLength="1" 
        required 
        onChange={(e) => setLetter(e.target.value)}
        value={letter}
        ref={letterInputRef}
        />
        <button>Jogar!</button>
      </form>
    </div>
    <div className="wrongLettersContainer">
      <h3>Palavras já utilizadas:</h3>
      {wrongLetters.map((letter, i) => (
        <span key={i}>{letter}, </span>
      ))}
    </div>
   </div>
  )
}

export default Game