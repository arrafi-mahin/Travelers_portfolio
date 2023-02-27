import { createContext } from "react";

export const AuthContext = createContext({
  isLogin: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
