import React from 'react'
import MeetingsPage from './MeetingsPage'
import AddMeetingBtn from './AddMeetingBtn'
import './styles/home.css'

function Home(props) {
    return (
        <>
            <div className="home">
                <h1>Meetings </h1>
                <MeetingsPage user={props.user} />
                <AddMeetingBtn user={props.user} />
            </div>
        </>
    )
}

export default Home