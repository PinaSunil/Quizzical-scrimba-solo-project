import React from 'react'
import blob from '/blob.svg'
import blob2 from '/blob2.svg'
const Welcome = ({handleStartGame}) => {
  return (
    <div className='welcome-page'>
     <img src={blob} alt="" className='blob1' />
     <img src= {blob2} alt="" className='blob2'/>

     <div className='welcome-page-container'>
          <h1 className='title'>Quizzical</h1>
          <p className='description'>Challenge Your Brain with Exciting Quizzes!</p>
          <button className='start-btn' onClick={handleStartGame}> Start Quiz</button>
     </div>
    </div>
  )
}

export default Welcome