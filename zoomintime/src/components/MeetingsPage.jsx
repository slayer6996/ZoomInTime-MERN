import React, { useEffect, useState } from 'react'
import Meeting from './Meeting'
import './styles/meetingsPage.css'

function MeetingsPage(props) {
    const [meetings,setMeetings]=useState([])

    useEffect(async () => {
        const res=await fetch(`http://localhost:5000/meetings?email=${props.user.email}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data=await res.json()
        console.log(data[0].meetings)
        setMeetings([...data[0].meetings])
    }, [])
    
    // if(meetings.length!==0){
    //     for(let i=0;i<meetings.length;i++){
    //         console.log(meetings[i])
    //     }
    // }

    return (
        <>
            <div className="meetingsContainer">

                {
                    meetings.map((meetingInfo, meetingId) => {
                        return(
                            <div className="meetingBox">
                            <Meeting 
                                key={meetingInfo._id}
                                meetingInfo={meetingInfo}
                            />
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default MeetingsPage