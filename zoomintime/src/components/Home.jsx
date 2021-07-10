import React from 'react'
import MeetingsPage from './MeetingsPage'
import AddMeetingBtn from './AddMeetingBtn'

function Home(props){
    return(
        <>
                <h1>Meetings </h1>  
                <MeetingsPage user={props.user}/>
                <AddMeetingBtn user={props.user}/>
        </>
    )
}

export default Home