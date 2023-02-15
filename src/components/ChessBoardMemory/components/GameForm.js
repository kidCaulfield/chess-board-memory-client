import React from "react";

export default function GameForm({
  gameBoard,
  gameSquares,
  setUserAnswers,
  setAnswers,
}) {
  async function endGame(data) {
    const res = await Game.post({ route: "game/end", data });
    setAnswers(res);
  }

  function handleSubmit(e) {
    // important! html element form submission by default reloads page
    e.preventDefault();
    const { currentTarget } = e;
    const formData = new FormData(currentTarget);
    const data = Object.fromEntries(formData);
    setUserAnswers(data);
    endGame(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {gameSquares.map((val) => (
          <div key={gameBoard[val]}>
            {gameBoard[val]}:
            <input type="radio" id={gameBoard[val]} name={val} value="dark" />
            <label for="html">Dark</label>
            <input type="radio" id={gameBoard[val]} name={val} value="light" />
            <label for="html">Light</label>
          </div>
        ))}
        <input type="submit" value="Finish" />
      </form>
    </div>
  );
}
