import React from "react";
import { Game } from "api/requests";
import { NUMBER_OF_GAME_QUESTIONS } from "utils/constants";

function getGrade(num) {
  return Object.values(num).reduce((acc, curr) => {
    if (curr === "correct") acc++;
    return acc;
  }, 0);
}

function calculatePercent(num) {
  return (num / NUMBER_OF_GAME_QUESTIONS).toFixed(2) * 100;
}

function calculateAccaracy(arr) {
  return (
    arr.reduce((acc, curr) => {
      return acc + curr;
    }, 0) / arr.length
  ).toFixed();
}

export default function GameForm({
  gameBoard,
  gameSquares,
  setUserAnswers,
  setAnswers,
  time,
  setTime,
}) {
  async function endGame(data) {
    const res = await Game.post({ route: "game/end", data });
    setAnswers(res);
    ///////// Save historical game data short term /////////
    let { results, bestTime, accuracy } = JSON.parse(
      localStorage.getItem("player")
    );
    const grade = getGrade(res);
    results.push(calculatePercent(grade));
    if (grade === NUMBER_OF_GAME_QUESTIONS) bestTime = time.toFixed(1);
    console.log("time.toFixed(1): ", time.toFixed(1));
    accuracy = calculateAccaracy(results);
    localStorage.setItem(
      "player",
      JSON.stringify({ results, bestTime, accuracy })
    );
  }

  function handleSubmit(e) {
    // important! html element form submission by default reloads page
    e.preventDefault();
    const { currentTarget } = e;
    const formData = new FormData(currentTarget);
    const data = Object.fromEntries(formData);
    if (Object.keys(data).length === NUMBER_OF_GAME_QUESTIONS) {
      setUserAnswers(data);
      endGame(data);
    } else {
      alert("You must answer all question before you can finish.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {gameSquares.map((val) => (
        <div key={gameBoard[val]}>
          {gameBoard[val]}:
          <input type="radio" id={gameBoard[val]} name={val} value="dark" />
          <label>Dark</label>
          <input type="radio" id={gameBoard[val]} name={val} value="light" />
          <label>Light</label>
        </div>
      ))}
      <input type="submit" value="Finish" />
    </form>
  );
}
