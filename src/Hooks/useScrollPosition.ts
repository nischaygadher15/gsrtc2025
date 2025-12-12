import React, { useEffect, useState } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Window size listener
  useEffect(() => {
    const handleScrolling = () => {
      let position = window.scrollY;
      setScrollPosition(position);
    };

    handleScrolling();

    window.addEventListener("scroll", handleScrolling);

    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);
  return scrollPosition;
};

export default useScrollPosition;
