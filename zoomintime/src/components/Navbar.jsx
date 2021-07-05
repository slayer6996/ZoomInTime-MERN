import React from 'react'
import './styles/navbar.css'
import Profile from './Profile';
import ProfileButton from './ProfileButton';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';

function Navbar(props) {
    const { isLoggedIn, loggedInUser } = props
    console.log(loggedInUser)

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
                    <Route path="/" component={Home} exact />
                    <Route path="/profile" component={Profile} exact />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Navbar