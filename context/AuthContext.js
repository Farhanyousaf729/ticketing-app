"use client";
import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "@clerk/nextjs";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSignedIn, user } = useUser();

    

  const Value = {
    user,isSignedIn
  };


  return <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);
