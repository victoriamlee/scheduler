import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setHistory(history => {
    if (replace) {
      const newHist = [...history];
      newHist.splice(-1, 1, mode);
      return newHist
    } else {
      return [...history, mode]
    }
  })
    setMode(mode);
  }


  function back() {
    setHistory(history => {
      if (mode === initial) {
        return;
      }
      const newHist = [...history].slice(0, -1);
      setMode(newHist[newHist.length - 1])
      return newHist
    })
  }


  return { 
    mode,
    transition,
    back
   };
};
