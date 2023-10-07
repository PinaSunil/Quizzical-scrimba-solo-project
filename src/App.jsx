import { useState } from "react"
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"
function App() {

 const [startGame, setStartGame] = useState(false)
 
 const handleStartGame = () => {
    setStartGame(prev => !prev)
 }



  return (
    <>
     {!startGame  ? <Welcome handleStartGame = {handleStartGame}/> : <Quiz  handlePlayAgain = {handleStartGame}/>} 
    </>
  )
}

export default App
