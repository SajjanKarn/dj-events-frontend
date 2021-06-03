import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // register user
  const register = async (user) => {
    console.log(user);
  };

  // login user
  const login = async ({ email: identifier, password }) => {
    const loginRes = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await loginRes.json();
    
    if (loginRes.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // log out
  const logout = () => {
    console.log("log out");
  };

  // checkLoggedIn user
  const checkUserLoggedIn = (user) => {
    console.log(user);
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
