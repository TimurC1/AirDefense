import { useState, useEffect } from "react";

export const useStopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    let interval: number;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      // @ts-ignore
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return { time };
};
