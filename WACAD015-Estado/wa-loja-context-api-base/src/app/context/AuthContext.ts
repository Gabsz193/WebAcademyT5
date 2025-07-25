import {createContext} from "react";

export interface IAuthContext {
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  email: null,
  login: () => {},
  logout: () => {}
});