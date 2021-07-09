import React from 'react'
import Meeting from './Meeting'
import './styles/meetingsPage.css'

function MeetingsPage() {
    return (
        <>
            <div className="meetingsContainer">
                <div className="meetingBox">
                    <Meeting />
                </div>
                <div className="meetingBox">
                    <Meeting />
                </div>
                <div className="meetingBox">
                    <Meeting />
                </div>

            </div>
        </>
    )
}

export default MeetingsPage