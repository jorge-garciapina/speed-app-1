import { useContext, useEffect, useState } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";
import {
  INITIAL_AVAILABLE_CHARACTERS,
  INITIAL_INDIVIDUAL_CHARACTER,
} from "../../utils/initial-values";
import {
  AvailableCharactersType,
  AllowedCharactersType,
  InfoForModal,
} from "../../types";
import { Button, Container, Paper, styled, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

import DataTable from "./data-table";

// FOR TESTING THE MODAL COFIG:
import IndividualCharacterVisualizer from "./individual-character-visualizer";

const CustomGraphChar = styled(BarChart)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: "white",
}));

const CustomSuccessErrorsContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  width: "80%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  marginBottom: "10px",
}));

export default function StatisticsVisualizer() {
  const theme = useTheme();
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [charactersResults, setCharactersResults] =
    useState<AvailableCharactersType>(INITIAL_AVAILABLE_CHARACTERS);
  const state = useContext(SpeedTypeContext);
  const [infoForIndividualCharModal, setInfoForIndividualCharModal] =
    useState<InfoForModal>({
      character: "A",
      infoObject: { ...INITIAL_INDIVIDUAL_CHARACTER },
    });

  // FOR THE MODAL:
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setTotalSuccess(state?.InputStatistics.totalSuccess as number);
  }, [state?.InputStatistics.totalSuccess]);

  useEffect(() => {
    setTotalErrors(state?.InputStatistics.totalErrors as number);
  }, [state?.InputStatistics.totalErrors]);

  useEffect(() => {
    // console.log(state?.InputStatistics.availableCharacters);
    setCharactersResults(
      state?.InputStatistics.availableCharacters as AvailableCharactersType
    );

    // About the dependencies array:
    // I have decided that this useEffect depends upon state?.InputStatistics.availableCharacters
    // and not only of state?.InputStatistics just to keep the same "syntax" of the other useEffects. In principle the
    // availableCharacters is modified each time state?.InputStatistics changes.
  }, [state?.InputStatistics]);

  // To create the buttons associated which is available character
  const availableCharactersArray1 = Object.entries(charactersResults).map(
    (element, index) => {
      return (
        <Button
          key={index}
          onClick={() => {
            setModalOpen(true);
            setInfoForIndividualCharModal({
              character: element[0] as AllowedCharactersType,
              infoObject: element[1],
            });
          }}
        >
          {element[0]}
        </Button>
      );
    }
  );

  const xAxis = Object.keys(charactersResults);
  const totalSuccessArr = Object.values(charactersResults).map((element) => {
    return element.totalSuccess;
  });
  const totalErrorsArr = Object.values(charactersResults).map((element) => {
    return element.totalErrors;
  });

  return (
    <>
      <Container> {availableCharactersArray1}</Container>
      <IndividualCharacterVisualizer
        open={modalOpen}
        handleClose={handleModalClose}
        infoForIndividualCharModal={infoForIndividualCharModal}
      />

      <CustomSuccessErrorsContainer elevation={24}>
        <Typography variant="totalSuccess">
          Total Success: {totalSuccess}
        </Typography>

        <Typography variant="totalErrors">
          Total Errors: {totalErrors}
        </Typography>
      </CustomSuccessErrorsContainer>

      {/* <CustomGameGameInformation elevation={24}>
        <Typography variant="gameInfo">Accuracy: {accuracy}</Typography>
        <Typography variant="gameInfo">
          Average Speed: {averageSpeed}
        </Typography>
        <Typography variant="gameInfo">
          Max Speed: {maxSpeed < 10000 ? maxSpeed : 0}
        </Typography>
      </CustomGameGameInformation> */}

      <DataTable />

      {/* TODO: Ask if it is possible to style this component without using sx 
                from the documentation it seems that to style the component I need to 
                use sx. 
                I cannot use variants, and the styled component does not seems to work
      */}
      <CustomGraphChar
        series={[
          {
            data: totalSuccessArr,
            color: theme.palette.success.light,
          },
          {
            data: totalErrorsArr,
            color: theme.palette.error.light,
          },
        ]}
        height={290}
        xAxis={[
          {
            data: xAxis,
            scaleType: "band",
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </>
  );
}
