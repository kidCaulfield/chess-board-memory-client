import React, { useEffect, useState } from "react";
import { Game } from "api/requests";
import { isObjectEmpty } from "utils/isObjectEmpty";

export default function () {
  const [gameBoard, setGameBoard] = useState({});
  const [gameSquares, setGameSquares] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [answers, setAnswers] = useState({});

  async function initializeGame() {
    let res = await Game.get({ route: "game/start" });
    setGameSquares(res);
  }

  async function replayGame() {
    setUserAnswers({});
    setAnswers({});
    initializeGame();
  }

  async function endGame(data) {
    const res = await Game.post({ route: "game/end", data });
    setAnswers(res);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { currentTarget } = e;
    const formData = new FormData(currentTarget);
    const data = Object.fromEntries(formData);
    setUserAnswers(data);
    endGame(data);
  }

  function handleClick(e) {
    let res = [];
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
      <div>
        {Object.keys(answers).map((val) => (
          <div key={gameBoard[val]}>
            {gameBoard[val]} : {userAnswers[val]} was {answers[val]}
          </div>
        ))}
        <button name="play-again" onClick={handleClick}>
          Play Again
        </button>
      </div>
    );
  return (
    <div>
      {gameSquares.length ? (
        <div>
          <form onSubmit={handleSubmit}>
            {gameSquares.map((val) => (
              <div key={gameBoard[val]}>
                {gameBoard[val]}:
                <input
                  type="radio"
                  id={gameBoard[val]}
                  name={val}
                  value="dark"
                />
                <label for="html">Dark</label>
                <input
                  type="radio"
                  id={gameBoard[val]}
                  name={val}
                  value="light"
                />
                <label for="html">Light</label>
              </div>
            ))}
            <input type="submit" value="Finish" />
          </form>
        </div>
      ) : (
        <button name="play" onClick={handleClick}>
          Play
        </button>
      )}
    </div>
  );
}
