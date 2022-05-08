import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("")
  const [id, setId] = useState()

    const signIn = () => {
        console.log('sign in');
        setIsAuthenticated(true)
    }

    const signUp = () => {
        console.log('sign up')
      }
      
      const logout = () => {
      console.log('logout')
      setIsAuthenticated(false)
      setToken('')
      setId(0)
    }

  const [error, setError] = useState("");
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, error, setError, signIn, signUp, token, setToken, token, logout, id, setId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
