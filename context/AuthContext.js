"use client";
import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "@clerk/nextjs";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const [userData, setUserData] = useState(null);

  // # get currentuser data from backend

    const getUser = async () => {
      try {
        const res = await fetch("/api/authUser");
        const {user} = await res.json();
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      if (isSignedIn) {
        getUser();
      }
      else {
        setUserData(null);
      }
      
    }, [isSignedIn, user]);
    
   

  const Value = {
    user,isSignedIn, userData
  };


  return <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);
