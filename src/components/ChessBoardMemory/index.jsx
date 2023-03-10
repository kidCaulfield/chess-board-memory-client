import React, { useEffect, useRef, useState } from "react";
import { Game } from "api/requests";
import { isObjectEmpty } from "utils/isObjectEmpty";
import Answers from "./components/Answers";
import GameForm from "./components/GameForm";
import Timer from "./components/Timer";
import ScoreBoard from "./components/ScoreBoard";

export default function ChessBoardMemory() {
  // Think of moving gameboard to context
  const [gameBoard, setGameBoard] = useState({});
  const [gameSquares, setGameSquares] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [answers, setAnswers] = useState({});

  async function initializeGame() {
    if (!localStorage.getItem("player"))
      localStorage.setItem(
        "player",
        JSON.stringify({
          results: [],
          bestTime: null,
          accuracy: null,
        })
      );
    let res = await Game.get({ route: "game/start" });
    setGameSquares(res);
  }

  async function replayGame() {
    setUserAnswers({});
    setAnswers({});
    initializeGame();
  }

  function handleClick(e) {
    switch (e.target.name) {
      case "play":
        initializeGame();
        break;
      case "play-again":
        replayGame();
        break;
      default:
        alert("Something went wrong!");
    }
  }

  useEffect(() => {
    async function getBoard() {
      const res = await Game.get({ route: "game" });
      setGameBoard(res);
    }

    getBoard();
  }, []);

  if (isObjectEmpty(gameBoard)) return <div>No Board!</div>;
  if (!isObjectEmpty(answers))
    return (
      <Answers
        gameBoard={gameBoard}
        userAnswers={userAnswers}
        answers={answers}
        handleClick={handleClick}
      />
    );
  return (
    <div>
      <ScoreBoard />
      {gameSquares.length ? (
        <div>
          <Timer />
          <GameForm
            gameBoard={gameBoard}
            gameSquares={gameSquares}
            setUserAnswers={setUserAnswers}
            setAnswers={setAnswers}
          />
        </div>
      ) : (
        <button name="play" onClick={handleClick}>
          Play
        </button>
      )}
    </div>
  );
}
