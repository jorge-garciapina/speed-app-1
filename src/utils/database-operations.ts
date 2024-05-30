import { LoginCredentialsType, RegisterCredentialsType } from "../types";

import { LoginInfoType } from "../types";

const databaseSingleton = (function () {
  function login({ userID, password }: LoginCredentialsType): LoginInfoType {
    console.log(
      "LOGIN IN DATABASE SINGLETON",
      "userID: ",
      userID,
      "password",
      password
    );
    return {
      name: "validatedUser",
      email: "validatedEmail",
      avatar: "avatar",
    };
  }

  function register({
    userName,
    userEmail,
    password,
    userAvatar,
  }: RegisterCredentialsType): LoginInfoType {
    console.log(
      "REGISTER IN DATABASE SINGLETON",
      "userName: ",
      userName,
      "userAvatar: ",
      userAvatar,
      "userEmail: ",
      userEmail,
      "password",
      password
    );
    return {
      name: "validatedUser",
      email: "validatedEmail",
      avatar: "avatar",
    };
  }

  function verifyAvailableName(name: string): boolean {
    console.log("AVAILABLE NAME IN DATABASE SINGLETON", "NAME:", name);

    return true;
  }

  // function updateUserStatistics(){}

  return {
    // the first value to isExecuting is false
    login: function ({ userID, password }: LoginCredentialsType) {
      return login({ userID, password });
    },

    register: function ({
      userName,
      userEmail,
      password,
      userAvatar,
    }: RegisterCredentialsType) {
      return register({ userName, userEmail, password, userAvatar });
    },

    verifyAvailableName: function (name: string) {
      return verifyAvailableName(name);
    },
  };
})();

// Check this example implementations for guide:
// console.log(databaseSingleton());
// console.log(databaseSingleton());
// console.log(databaseSingleton());
// console.log(databaseSingleton());
export default databaseSingleton;
