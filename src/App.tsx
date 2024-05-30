import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// Use a theme
import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "./general-store/context-provider";
import reducer from "./general-store/global-reducer";
import { useReducer } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./mui-configurations/themes/themeFile";

import GameView from "./components/game-view/index-game-view";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  INITIAL_WORD,
  INITIAL_WORD_LENGTH,
  INITIAL_INDEX_WORD,
  INITIAL_STATISTICS,
  INITIAL_LAST_STROKE,
  INITIAL_IS_PLAYING,
  INITIAL_TIME_INTERVAL,
  INITIAL_DIFFICULTY,
  INITIAL_SHOW_WINNER_MODAL,
  INITIAL_USERNAME,
  INITIAL_USER_PASSWORD,
  INITIAL_USER_EMAIL,
  INITIAL_USER_ID,
} from "./utils/initial-values";

import InitialView from "./components/initial-view/initial-view";
import LoginComponent from "./components/loginForm/index-login";
import RegisterComponent from "./components/register/index-register";

/////////////////////////////////////////////////
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
];
// TO TEST INDEXDB: MOVE TO THE --->database-operations.tsx<---
const dbName = "the_name";

const request = indexedDB.open(dbName, 3);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create another object store called "names" with the autoIncrement flag set as true.
  const objStore = db.createObjectStore("names", { autoIncrement: true });

  // Because the "names" object store has the key generator, the key for the name value is generated automatically.
  // The added records would be like:
  // key : 1 => value : "Bill"
  // key : 2 => value : "Donna"
  customerData.forEach((customer) => {
    objStore.add(customer.name);
  });
};

// Notes
/////////////////////////////////////////////////

function App() {
  // The errors in the useReducer are solved by modifying the --->ReducerStateType<--- in the types
  const [state, dispatch] = useReducer(reducer, {
    currentWord: INITIAL_WORD,
    currentWordLength: INITIAL_WORD_LENGTH,
    currentIndexInWord: INITIAL_INDEX_WORD,
    lastStroke: INITIAL_LAST_STROKE,
    winnerModal: INITIAL_IS_PLAYING,
    showWinnerModal: INITIAL_SHOW_WINNER_MODAL,
    timeInterval: INITIAL_TIME_INTERVAL,
    difficulty: INITIAL_DIFFICULTY,
    InputStatistics: INITIAL_STATISTICS,
    userName: INITIAL_USERNAME,
    userPassword: INITIAL_USER_PASSWORD,
    userEmail: INITIAL_USER_EMAIL,
    userID: INITIAL_USER_ID,
    avatar: "",
  });
  return (
    <SpeedTypeContext.Provider value={state}>
      <SpeedTypeDispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<InitialView />} />
                <Route path="game" element={<GameView />} />
                <Route path="login" element={<LoginComponent />} />
                <Route path="register" element={<RegisterComponent />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SpeedTypeDispatchContext.Provider>
    </SpeedTypeContext.Provider>
  );
}

export default App;
