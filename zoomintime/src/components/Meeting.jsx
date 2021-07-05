import React from 'react'
import './styles/meeting.css'
import Button from '@material-ui/core/Button';

function Meeting(){
    return(
        <>
            <div className="meeting">
                <div className="meetingDetails">
                    <h3>Meeting title</h3>
                    <p>Time and Date</p>
                </div>
                <div className="meetingButtons">
                    <Button style={{backgroundColor:"#d9534f",color:"white"}}>Delete</Button>
                    <Button style={{backgroundColor:"#0275d8",color:"white", marginLeft:"1rem"}}>Attend</Button>
                </div>
            </div>
        </>
    )
}

export default Meeting