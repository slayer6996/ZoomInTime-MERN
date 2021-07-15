import React, { useEffect, useState } from 'react'
import Meeting from './Meeting'
import './styles/meetingsPage.css'

function MeetingsPage(props) {
    const [meetings,setMeetings]=useState([])

    useEffect( () => {
        async function fetchData(){
            const res=await fetch(`http://localhost:5000/meetings?email=${props.user.email}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data=await res.json()
        setMeetings([...data[0].meetings])
        }
        fetchData()
    }, [])


    return (
        <>
            <div className="meetingsContainer">

                {
                    meetings.map((meetingInfo) => {
                        return(
                            <div className="meetingBox">
                            <Meeting 
                                key={meetingInfo._id}
                                meetingInfo={meetingInfo}
                                userEmail={props.user.email}
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