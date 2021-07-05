import React from 'react'
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth'
import './App.css';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyB1gy5UgGuaY9KzgV8B4AWR1w628SVjkE0",
  authDomain: "zoomintimeapp.firebaseapp.com",
  projectId: "zoomintimeapp",
  storageBucket: "zoomintimeapp.appspot.com",
  messagingSenderId: "1044983447936",
  appId: "1:1044983447936:web:5d37b429bb822361880165",
  measurementId: "G-L67MHCKKS1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    imageUrl: ""
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userCredentials => {
      if (userCredentials) {
        console.log(userCredentials)
        setUser({
          name: userCredentials.displayName,
          email: userCredentials.email,
          imageUrl: userCredentials.photoURL
        })
        setAuth(true)
      }
    })
  }, [])

  function googleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      userCredentials => {
        if (userCredentials) {
          setAuth(true)
        }
      }
    )
  }

  return (
    <>
      <center>
        {auth ? <Navbar isLoggedIn={auth} loggedInUser={user} /> : (<div className="signupCTA">
          <h3>Continue to ZoomInTime</h3>
          <p>Sign in to manage your meetings.</p>
          <Button variant="contained" style={{ backgroundColor: "#DB4437" }} onClick={googleLogin}>Continue with Google</Button>
        </div>)}
      </center>
    </>
  );
}

export default App;
