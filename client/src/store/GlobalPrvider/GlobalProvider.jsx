import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalProvider({ children }) {
  //state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //hooks

  const getAuthedUser = useCallback((user, token, navigate) => {
    localStorage.setItem("auth", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    setUser(user);
    setToken(token);
    navigate("/");
  }, []);

  const logOut = useCallback((navigate) => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  }, []);
  useEffect(() => {
    const authUser = localStorage.getItem("auth");
    const token = localStorage.getItem("token");
    if (authUser) {
      setUser(JSON.parse(authUser));
      setToken(token);
    }
  }, []);

  const value = {
    user,
    getAuthedUser,
    logOut,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
