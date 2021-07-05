import React from 'react'
import PersonIcon from '@material-ui/icons/Person';

function ProfileButton(){
    return(
        <>
            <span className="profileIcon"><PersonIcon fontSize="large"/><p>Profile</p></span>
        </>
    )
}

export default ProfileButton