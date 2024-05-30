import StatisticsVisualizer from "../statistics-visualizer/index-statistics-visualizer";
import PlayingArea from "../playing-area/index-playing-area";
import CustomPaper from "../../mui-configurations/styled-components/custom-paper";
import { styled, Box, Grid } from "@mui/material";
import { useContext, memo } from "react";
import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";

import EndGameModal from "../end-of-game-modal/index-end-game-modal";

import TimerComponent from "../timer-component/index-timer";

import LateralMenuComponent from "../lateral-menu/index-lateral-menu";

// const CustomMainContainer = styled(Box)(() => ({}));

const CustomGameView = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
}));

// const CustomLateralMenu = styled(Box)(() => ({
//   backgroundColor: "revert",
//   height: "100%",
//   width: "100%",
// }));

memo;

const GameView = memo(() => {
  // FOR THE MODAL:
  const handleModalClose = () => {
    //TODO: IN THIS PART I HAVE TO PUT THE ENTRYPOINT FOR THE DATABASE
    //      I WILL CREATE A NEW ENTRY FOR THE CURRENT GAME, IN THE
    //      USER PROFILE IN THE DATABASE
    console.log("INFO SAVE: index-game-view -DD-");
    dispatch!({ type: "restart-values" });
    dispatch!({
      type: "close-winner-modal",
    });

    // dispatch!({ type: "finish-game" });
  };

  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);

  function finishGame() {
    dispatch!({ type: "call-winner-modal" });
    dispatch!({ type: "finish-game" });
  }

  // console.log("rendered"); // THIS LOG MAKES EVIDENT THAT I NEED TO OPTIMIZE THE CODE
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <LateralMenuComponent />
      </Grid>
      <Grid item xs={10}>
        <CustomGameView>
          <TimerComponent finishGame={finishGame} />

          <EndGameModal
            open={state?.showWinnerModal as boolean}
            handleClose={handleModalClose}
          />

          <CustomPaper elevation={24}>
            <PlayingArea />
          </CustomPaper>

          <CustomPaper elevation={24}>
            <StatisticsVisualizer />
          </CustomPaper>
        </CustomGameView>
      </Grid>
    </Grid>
  );
});

export default GameView;
