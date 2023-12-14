import React, { useState, useEffect } from "react";

export default function CountDown({ expiryDate }) {
  const [time, setTime] = useState("");
  const [cancelId, setCancelId] = useState();

  useEffect(() => {
    expiryDateCountDown();

    const cancelId = requestAnimationFrame(expiryDateCountDown);
    setCancelId(cancelId);

    return () => {
      cancelAnimationFrame(cancelId);
    };
  }, []);

  function expiryDateCountDown() {
    const millisElapsed = expiryDate - Date.now();

    if (millisElapsed < 0) {
      cancelAnimationFrame(cancelId);
      setCancelId(null);
      setTime("Expired");
      return;
    }

    const secondsLeft = millisElapsed / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    //
    const secondsText = Math.floor(secondsLeft % 60);
    const minutesText = Math.floor(minutesLeft % 60);
    const hoursText = Math.floor(hoursLeft);

    setTime(`${hoursText}h ${minutesText}m ${secondsText}s`);

    const cancelId = requestAnimationFrame(expiryDateCountDown);
  }

  return <div>{time}</div>;
}
