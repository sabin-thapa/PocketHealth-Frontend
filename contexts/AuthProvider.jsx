import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);

    const signIn = () => {
        console.log('sign in');
        setIsAuthenticated(true)
    }

    const signUp = () => {
        console.log('sign up')
    }

  const [error, setError] = useState("");
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, error, setError, signIn, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
