import Box from "@mui/material/Box";
import { Slider, Typography, Button } from "@mui/material";
import { useRef, useContext, useState } from "react";
import { SpeedTypeDispatchContext } from "../../general-store/context-provider";
import {
  INITIAL_TIME_INTERVAL,
  INITIAL_DIFFICULTY,
} from "../../utils/initial-values";

export default function LateralMenuComponent() {
  const difficultySlider = useRef<HTMLSpanElement>(null);
  const timeSlider = useRef<HTMLSpanElement>(null);

  const [difficulty, setDifficulty] = useState(INITIAL_DIFFICULTY);
  const [timeInterval, setTimeInterval] = useState(INITIAL_TIME_INTERVAL);

  const dispatch = useContext(SpeedTypeDispatchContext);

  function difficultyChanges(event: Event, value: number | number[]) {
    setDifficulty(value as number);
  }

  function timeChanges(event: Event, value: number | number[]) {
    setTimeInterval(value as number);
  }

  function startGame() {
    //TODO: I need to fix the issue of retrieveing the value:
    // const selectedDifficulty = 5;
    // const selectedDifficulty = difficultySlider.current.value // SEE HOW THAT WORKS

    // const selectedtTime = timeSlider.current.value // SEE HOW THAT WORKS

    dispatch!({ type: "start-game" });

    dispatch!({ type: "set-interval-time", totalTime: timeInterval });
    dispatch!({ type: "set-difficulty", difficulty: difficulty });
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <Typography variant="gameConfigHeader">Configuration</Typography>

      <Typography variant="lateralMenuSectionHeader">Difficulty:</Typography>

      <Slider
        onChange={difficultyChanges}
        ref={difficultySlider}
        aria-label="Difficulty"
        defaultValue={INITIAL_DIFFICULTY}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />

      <Typography variant="lateralMenuSectionHeader">Time:</Typography>

      <Slider
        onChange={timeChanges}
        ref={timeSlider}
        aria-label="Time"
        defaultValue={INITIAL_TIME_INTERVAL}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={120}
      />

      <Button onClick={startGame} variant="playAgain">
        Start Game
      </Button>
    </Box>
  );
}
