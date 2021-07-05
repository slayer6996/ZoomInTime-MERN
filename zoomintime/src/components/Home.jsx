import React from 'react'
import MeetingsPage from './MeetingsPage'
import AddMeetingBtn from './AddMeetingBtn'

function Home(){
    return(
        <>
                <h1>Meetings </h1>  
                <MeetingsPage/>
                <AddMeetingBtn/>
        </>
    )
}

export default Home