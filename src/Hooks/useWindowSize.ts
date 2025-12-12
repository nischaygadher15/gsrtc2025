import React, { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<number>(0);

  // Window size listener
  useEffect(() => {
    const listenWindowSize = () => {
      // console.log(window.innerWidth);
      setWindowSize(window.innerWidth);
    };

    listenWindowSize();

    window.addEventListener("resize", listenWindowSize);

    return () => {
      window.removeEventListener("resize", listenWindowSize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
