import './App.css';
// import Main from "./components/Main"
import Die from "./components/Die"
import React from 'react'
import {nanoid} from "nanoid"

function App() {
  function allNewDice() {
    let newArray = []
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value:Math.floor(Math.random()*6 + 1),
        isHeld: false,
        id: nanoid()
      })
    }
    return newArray
  }

  const [dieValue,setDiceValue] = React.useState(allNewDice())
  const diceValues = dieValue.map(val =><Die key={val.id}value={val.value}/>)

  function rollDice() {
    setDiceValue(allNewDice())
  }
  return (
    <main className="main">
      <div className='die-container'>
        {diceValues}
      </div>
      <button className="roll-dice" onClick={rollDice}>ROLL</button>
    </main>
  );
}

export default App;
