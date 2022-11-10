import { createContext, useEffect, useReducer } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const UserReducerTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
const INITIAL_STATE = {
  currentUser: null,
};

export const UserReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserReducerTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandeled type ${type} for UserReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const setCurrentUser = (user) => {
    dispatch({ type: UserReducerTypes.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const subscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });
    return subscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
