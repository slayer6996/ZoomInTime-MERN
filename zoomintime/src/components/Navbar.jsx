import React, { useEffect } from 'react'
import './styles/navbar.css'
import Profile from './Profile';
import ProfileButton from './ProfileButton';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';

function Navbar(props) {
    const { isLoggedIn, loggedInUser } = props
    console.log(loggedInUser)

    useEffect(async() => {
            const res=await fetch('http://localhost:5000', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:loggedInUser.email
            })
        })
        const data=await res.json()
        console.log(data)
    },[loggedInUser])

    return (
        <>
            <BrowserRouter>
                <div className="nav">
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <h1 className="navTitle">ZoomInTime</h1>
                    </Link>
                    {isLoggedIn && <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
                        <ProfileButton />
                    </Link>}
                </div>
                <Switch>
                    <Route path="/" component={() => <Home user={loggedInUser} />} exact />
                    <Route path="/profile" component={() => <Profile user={loggedInUser}/>} exact />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Navbar