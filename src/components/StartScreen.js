import React from 'react'
import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <div className="title">
          <h1>Secret</h1>
          <h2>Word</h2>
        </div>
        <button onClick={startGame}>Play</button>
    </div>
  )
}

export default StartScreen