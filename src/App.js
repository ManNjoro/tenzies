import "./App.css";
// import Main from "./components/Main"
import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
function App() {

  const [tenzies, setTenzies] = React.useState(false)

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(generateNewDie());
    }
    return newArray;
  }

  const [dieValue, setDiceValue] = React.useState(allNewDice());
  const diceValues = dieValue.map((val) => (
    <Die
      key={val.id}
      value={val.value}
      isHeld={val.isHeld}
      holdDice={() => holdDice(val.id)}
    />
  ));

  function rollDice() {
    setDiceValue((oldDice) =>
      oldDice.map((val) => {
        return val.isHeld ? val : generateNewDie();
      })
    );
  }
  function newGame() {
    setTenzies(false)
    setDiceValue(allNewDice())
  }

  function holdDice(id) {
    setDiceValue((oldDice) =>
      oldDice.map((val) => {
        return val.id === id ? { ...val, isHeld: !val.isHeld } : val;
      })
    );
  }

  React.useEffect(()=>{
    const allHeld = dieValue.every(die => die.isHeld)
    const firstValue = dieValue[0].value
    const allSameValue = dieValue.every(die=>die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  },[dieValue])
  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceValues}</div>
      <button className="roll-dice" onClick={tenzies ? newGame:rollDice}>
        {tenzies ? "New Game" : "ROLL"}
      </button>
      {tenzies && <Confetti />}
    </main>
  );
}

export default App;
