import React from "react";

export default function Answers({
  gameBoard,
  userAnswers,
  answers,
  handleClick,
}) {
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
}
