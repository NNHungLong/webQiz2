import { useEffect, useState } from 'react';

interface Props {
  timeLeft: number;
  setCountDown: (time: number) => () => void;
}

export default function TimeoutClock({ timeLeft, setCountDown }: Props) {
  useEffect(() => {
    let clearCounDownInterval = setCountDown(timeLeft);
    return clearCounDownInterval;
  }, []);
  return (
    <div>
      <h1>Time Remaining: {timeLeft}</h1>
    </div>
  );
}
