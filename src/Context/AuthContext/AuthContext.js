import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../../Authentication/Firebase/Firebase";

export const AuthProvider = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});
  const SignUpWithForm = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const SignOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const authInformation = { user, SignUpWithForm,SignIn, SignOut };

  return (
    <>
      <AuthProvider.Provider value={authInformation}>
        {children}
      </AuthProvider.Provider>
    </>
  );
};

export default AuthContext;
