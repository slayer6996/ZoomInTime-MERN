import React, {useState} from 'react'
import './styles/meeting.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: '15px',
        boxShadow: theme.shadows[5],
        margin:'2rem',
        padding: '3rem',
    },
}));

function Meeting(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { meetingDate, meetingLink, meetingTime, meetingTitle, _id } = props.meetingInfo

    const [meeting, setMeeting]=useState({
        email:props.userEmail,
        meetingTitle: meetingTitle,
        meetingTime: meetingTime,
        meetingDate: meetingDate,
        meetingLink: meetingLink
    })

    const deleteMeeting = async (meetingId) => {
        const res = await fetch(`http://localhost:5000/meetings/${meetingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: props.userEmail
            })
        })
        const data=res.json()
    }

    function handleDelete(meetingId) {
        deleteMeeting(meetingId)
    }

    const updateMeeting = async (meetingId) => {
        const res = await fetch(`http://localhost:5000/meetings/${meetingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meeting)
        })
        const data=res.json()
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeeting(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }

    function formSubmit(meetingId){
        //Add meeting to the DB
        updateMeeting(meetingId)
        setMeeting({
            email:props.userEmail,
            meetingTitle: "",
            meetingTime: "",
            meetingDate: "",
            meetingLink: ""
        })
        setOpen(false)
    }

    return (
        <>
            <div>
                <div className="meeting" >
                    <div className="meetingDetails" onClick={handleOpen}>
                        <h3>{meetingTitle}</h3>
                        <p>{meetingTime}</p>
                        <p>{meetingDate}</p>
                    </div>
                    <div className="meetingButtons">
                        <form>
                            <Button
                                type="submit"
                                onClick={() => {
                                    handleDelete(_id)
                                }}
                                style={{ backgroundColor: "#d9534f", color: "white" }}>Delete</Button>
                            <Button href={meetingLink} target="_blank" style={{ backgroundColor: "#0275d8", color: "white", marginLeft: "1rem" }}>Attend</Button>
                        </form>
                    </div>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Edit meeting</h2>
                            <form className="meetingDetailInput" noValidate autoComplete="off">
                                <TextField name="meetingTitle" value={meeting.meetingTitle} onChange={e => handleChange(e)} id="standard-secondary" label="Meeting title" />
                                <TextField
                                    name="meetingTime"
                                    value={meeting.meetingTime}
                                    onChange={e => handleChange(e)}
                                    id="time"
                                    label="Meeting time"
                                    type="time"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                                <TextField
                                    name="meetingDate"
                                    value={meeting.meetingDate}
                                    onChange={e => handleChange(e)}
                                    id="date"
                                    label="Meeting date"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField name="meetingLink" value={meeting.meetingLink} onChange={e => handleChange(e)} id="standard-secondary" label="Meeting link" />
                                <Button type="submit" onClick={() => formSubmit(_id)} style={{ marginTop: '1rem' }} variant="contained" color="primary">
                                    Update
                                </Button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default Meeting