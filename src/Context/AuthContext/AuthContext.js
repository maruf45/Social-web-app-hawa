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
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const SignUpWithForm = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const userProfile = (profile) => {
    setLoading(true)
    return updateProfile(auth.currentUser, profile);
  };
  const googlePopUp =() =>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider);
  }
  const SignOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
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
    loading
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
