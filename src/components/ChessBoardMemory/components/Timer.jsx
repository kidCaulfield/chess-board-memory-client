import React, { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTime(time + 0.1);
    }, 100);
  }, [time]);

  return <div>Time : {time.toFixed(1)}</div>;
}
