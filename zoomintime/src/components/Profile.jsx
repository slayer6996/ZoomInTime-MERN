import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth'
import { BrowserRouter, Link } from 'react-router-dom';

function Profile(){

    function signout(){
        firebase.auth().signOut().then(() => {
            window.location.reload(false)
        })
    }

    return(
        <>
            <BrowserRouter>
            <h1>profile page</h1>
                <Link to="/">
                    <button onClick={signout}>sign out</button>
                </Link>
            </BrowserRouter>
        </>
    )
}

export default Profile