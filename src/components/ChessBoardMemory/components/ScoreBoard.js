import React, { useEffect, useState } from "react";
import { isObjectEmpty } from "utils/isObjectEmpty";

export default function ScoreBoard() {
  const [player, setPlayer] = useState({});

  useEffect(() => {
    setPlayer(JSON.parse(localStorage.getItem("player") || "{}"));
  }, []);

  if (isObjectEmpty(player)) return <></>;
  return (
    <div>
      <div>Accuracy: {player.accuracy}</div>
      {player.bestTime && <div>Best Time: {player.bestTime}</div>}
    </div>
  );
}
