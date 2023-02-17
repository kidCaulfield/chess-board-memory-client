import React, { useEffect } from "react";

export default function Timer({ time, setTime }) {
  useEffect(() => {
    setInterval(() => {
      setTime(time + 0.1);
    }, 100);
  }, [time]);

  return <div>Time : {time.toFixed(1)}</div>;
}
