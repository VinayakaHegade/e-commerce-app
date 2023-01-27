// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWE0S7mumk1YKji_oFYH_SY1ABRQo4H90",
  authDomain: "ecomm-app-shopz.firebaseapp.com",
  projectId: "ecomm-app-shopz",
  storageBucket: "ecomm-app-shopz.appspot.com",
  messagingSenderId: "1027580055996",
  appId: "1:1027580055996:web:63d5bc67785c3c5bb69bb9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState();

  const signUp = (email, Password, displayName) => {
    createUserWithEmailAndPassword(auth, email, Password, displayName).then(
      ({ user }) => {
        updateProfile(user, { displayName });
        setUser(user);
        return user;
      }
    );
  };

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });
  };

  const signOutUser = (auth) => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (user) => {
        user ? setUser(user) : setUser(null);
      });
    return () => unsubscribe();
  });

  return { signUp, signIn, signOut: signOutUser, user };
}

export default AuthProvider;
