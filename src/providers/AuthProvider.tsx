"use client";

import { jwtDecode } from "jwt-decode";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  email: string;
  password: string;
  username: string;
  bio: string | null;
  profilePicture: string | null;
};

export type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};
export type decodedTokenType = {
  data: User;
};
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const decodedToken: decodedTokenType = jwtDecode(localToken);
      setUser(decodedToken.data);
      setToken(localToken);
    }
  }, []);
  const values = {
    user: user,
    setUser,
    token,
    setToken,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "Auth context ashiglahiin tuld zaaval provider dotor bh heregtei"
    );
  }
  return authContext;
};
