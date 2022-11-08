import React, {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //equal in parameter sets default
  function transition(mode, replace = false) {
    setMode(mode);
    if (!replace) {
      setHistory([...history, mode]);
    }
  }

  function back() {
    if (history.length === 1) {
      setMode(initial);
    } else {
      setHistory(history.slice(-1));
      setMode(history[history.length - 2]);
    }
  }

  return {mode, transition, back};
}

