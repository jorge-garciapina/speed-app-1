import { Button, Container, Typography, styled } from "@mui/material";
import LoginPaper from "../../mui-configurations/styled-components/login-paper";
import FormHolder from "../form-holder/index-form-holder";
import testValidator from "../../utils/test-validator";
import validateName from "../../utils/name-validation";
import validateEmail from "../../utils/email-validation";
import validatePassword from "../../utils/password-validation";

import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";
import { useContext, useState } from "react";

import databaseSingleton from "../../utils/database-operations";

import createDispatchEvent from "../../utils/curried-dispatch";

import AvatarSelectorModal from "../avatar-selector/index-avatar-selector";

import CustomAvatar from "../custom-avatar/index-custom-avatar";
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  background: theme.palette.secondary.light,
  height: "100vh",
}));

const nameValidator = testValidator(validateName);
const emailValidator = testValidator(validateEmail);
const passwordValidator = testValidator(validatePassword);

export default function RegisterComponent() {
  const [modalOpen, setModalOpen] = useState(false);
  const state = useContext(SpeedTypeContext);

  const dispatch = useContext(SpeedTypeDispatchContext);

  const setEventType = createDispatchEvent(dispatch);
  const dispatchNewName = setEventType("set-userName");
  const dispatchNewPassword = setEventType("set-userPassword");
  const dispatchNewEmail = setEventType("set-userEmail");

  const loginItems = [
    {
      textToDisplay: "Name",
      label: "name",
      isLoginItem: false,
      validationFunction: nameValidator,
      dispatchFunction: dispatchNewName,
    },
    {
      textToDisplay: "Email",
      label: "email",
      isLoginItem: false,
      validationFunction: emailValidator,
      dispatchFunction: dispatchNewEmail,
    },
    {
      textToDisplay: "Password",
      label: "password",
      isLoginItem: false,
      validationFunction: passwordValidator,
      dispatchFunction: dispatchNewPassword,
    },
    {
      textToDisplay: "Confirm Password",
      label: "password",
      isLoginItem: false,
      validationFunction: passwordValidator,
      dispatchFunction: dispatchNewPassword,
    },
  ];

  function hadleRegister() {
    // TODO:This needs to add a new logic to handle the promise given by databaseSingleton.register
    //      (that comes from the fact that we will use IndexDB)
    //      The reason for that is that if the user is registered correctly, then it must navigate
    //      to the game view
    databaseSingleton.register({
      userName: state?.userName,
      userEmail: state?.userEmail,
      password: state?.userPassword,
      userAvatar: state?.avatar,
    });
  }

  function closeModal(): void {
    setModalOpen(false);
  }

  function openModal(): void {
    setModalOpen(true);
  }
  return (
    <StyledContainer>
      <LoginPaper elevation={24}>
        <CustomAvatar
          openModal={openModal}
          src={state?.avatar || "/static/images/avatar/avatar0.png"}
        />
        <Typography variant="loginRegister">Register</Typography>
        <FormHolder items={loginItems} />

        <AvatarSelectorModal open={modalOpen} closeModal={closeModal} />

        <Button onClick={hadleRegister} variant="playAgain">
          Register
        </Button>
      </LoginPaper>
    </StyledContainer>
  );
}
