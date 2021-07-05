import React from 'react'
import Meeting from './Meeting'
import './styles/meetingsPage.css'

function MeetingsPage(){
    return(
        <>
            <div className="meetingsBox">
                <Meeting/>
            </div>
            <div className="meetingsBox">
                <Meeting/>
            </div>
            <div className="meetingsBox">
                <Meeting/>
            </div>
            <div className="meetingsBox">
                <Meeting/>
            </div>
            <div className="meetingsBox">
                <Meeting/>
            </div>
            <div className="meetingsBox">
                <Meeting/>
            </div>
            <div className="meetingsBox">
                <Meeting/>
            </div>
        </>
    )
}

export default MeetingsPage