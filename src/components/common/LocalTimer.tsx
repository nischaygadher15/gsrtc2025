"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const LocalTimer = ({
  time,
  isCounting,
  setIsCounting,
  expiry,
}: {
  time: number;
  isCounting: boolean;
  setIsCounting: Dispatch<SetStateAction<boolean>>;
  expiry: Dispatch<SetStateAction<boolean>>;
}) => {
  const [count, setCount] = useState<number>(time);
  let timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      console.log("stopTimer");
    }
  };

  const startTimer = () => {
    setCount(time);

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          stopTimer();
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (isCounting) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isCounting]);

  useEffect(() => {
    console.log("count", count);
    if (count <= 0) {
      console.log("OTP Expired!");
      setIsCounting(false);
      expiry(true);
    }
  }, [count]);

  return (
    <p className="flex items-center text-sm font-semibold leading-none text-primary">
      <span>00</span>
      <span>:</span>
      <span>{count < 10 ? `0${count}` : count}</span>
    </p>
  );
};

export default LocalTimer;
