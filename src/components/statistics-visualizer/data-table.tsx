// I will not create table for the letters. I will display more meaningful information for that
import Table from "@mui/material/Table";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer, TableCell, TableBody, styled } from "@mui/material";

import { useContext } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "600px",
  backgroundColor: theme.palette.primary.dark,
}));

const CustomTableCellTitle = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: "1rem",
  height: "30px",
}));

const CustomTableCellData = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: ".9rem",
  fontWeight: "bold",
  height: "20px",
}));
export default function DataTable() {
  const state = useContext(SpeedTypeContext);

  function limitCharacters(stringToLimit: string) {
    const textToLimit = stringToLimit.split("");

    textToLimit.splice(5);

    return textToLimit.join("");
  }

  return (
    <CustomTableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <CustomTableCellTitle align="center">Accuracy</CustomTableCellTitle>
            <CustomTableCellTitle align="center">
              Average Speed
            </CustomTableCellTitle>
            <CustomTableCellTitle align="center">
              Max Speed
            </CustomTableCellTitle>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={"row.accuracy"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <CustomTableCellData align="center" component="th" scope="row">
              {limitCharacters(String(state?.InputStatistics.accuracy))}
            </CustomTableCellData>
            <CustomTableCellData align="center">
              {limitCharacters(String(state?.InputStatistics.averageSpeed))}
            </CustomTableCellData>
            <CustomTableCellData align="center">
              {state?.InputStatistics.maxSpeed}
            </CustomTableCellData>
          </TableRow>
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
