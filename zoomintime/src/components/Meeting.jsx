import React from 'react'
import './styles/meeting.css'
import Button from '@material-ui/core/Button';

function Meeting(props){
    const {meetingDate, meetingLink, meetingTime, meetingTitle, _id}=props.meetingInfo
    return(
        <>
            <div className="meeting">
                <div className="meetingDetails">
                    <h3>{meetingTitle}</h3>
                    <p>{meetingTime}</p>
                    <p>{meetingDate}</p>
                </div>
                <div className="meetingButtons">
                    <Button style={{backgroundColor:"#d9534f",color:"white"}}>Delete</Button>
                    <Button href={meetingLink} target="_blank" style={{backgroundColor:"#0275d8",color:"white", marginLeft:"1rem"}}>Attend</Button>
                </div>
            </div>
        </>
    )
}

export default Meeting