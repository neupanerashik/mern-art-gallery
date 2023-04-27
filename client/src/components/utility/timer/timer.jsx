import { useMemo, useState } from "react";

function Timer({ endDate, artwork, handleTimerEnd }) {
  const [timeLeft, setTimeLeft] = useState("");

  useMemo(() => {
    if (endDate) { // Check if endDate is available before calculating the time left
      const endDateMs = Date.parse(endDate);
      const interval = setInterval(() => {
        const nowMs = Date.now();
        if (endDateMs <= nowMs) {
          clearInterval(interval);
          handleTimerEnd(artwork._id);
          setTimeLeft("Time has ended");
        } else {
          const timeLeftMs = endDateMs - nowMs;
          const secondsLeft = Math.floor(timeLeftMs / 1000) % 60;
          const minutesLeft = Math.floor(timeLeftMs / 1000 / 60) % 60;
          const hoursLeft = Math.floor(timeLeftMs / 1000 / 60 / 60) % 24;
          const daysLeft = Math.floor(timeLeftMs / 1000 / 60 / 60 / 24);
          setTimeLeft(
            `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`
          );
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [endDate, artwork?._id, handleTimerEnd]);

  return <div>{timeLeft}</div>;
}

export default Timer;
