import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../../Authentication/Firebase/Firebase";

export const AuthProvider = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const SignUpWithForm = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const userProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const googlePopUp =() =>{
    return signInWithPopup(auth,googleProvider);
  }
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
  const authInformation = {
    user,
    SignUpWithForm,
    SignIn,
    userProfile,
    googlePopUp,
    SignOut,
  };

  return (
    <>
      <AuthProvider.Provider value={authInformation}>
        {children}
      </AuthProvider.Provider>
    </>
  );
};

export default AuthContext;
