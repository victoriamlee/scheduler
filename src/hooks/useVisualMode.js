import { useState } from "react";

// custom hook that returns functions: mode, transition, and back
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transitions to a new mode and updates history
  function transition(mode, replace = false) {
    setHistory(history => {
    if (replace) {
      const newHist = [...history];
      newHist.splice(-1, 1, mode);
      return newHist;
    } else {
      return [...history, mode];
      }
    })
    setMode(mode);
  };

  // goes back to the previous view 
  function back() {
    setHistory(history => {
      if (mode === initial) {
        return;
      }
      const newHist = [...history].slice(0, -1);
      setMode(newHist[newHist.length - 1]);
      return newHist;
    })
  };

  return { 
    mode,
    transition,
    back
   };
};
