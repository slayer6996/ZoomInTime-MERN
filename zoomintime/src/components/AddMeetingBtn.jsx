import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './styles/addMeetingBtn.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        padding: '3rem',
    },
}));


function AddMeetingBtn(props) {

    const [meeting, setMeeting]=useState({
        email:props.user.email,
        meetingTitle: "",
        meetingTime: "",
        meetingDate: "",
        meetingLink: ""
    })

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(event) {
        const { name, value } = event.target
        setMeeting(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }

    const createNewMeeting=async () => {
        const res=await fetch('http://localhost:5000/meetings', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(meeting)
        })
        const data=await res.json()
    }

    function formSubmit(){
        //Add meeting to the DB
        createNewMeeting()
        setMeeting({
            email:props.user.email,
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
                <div className="addMeetingBtn">
                    <Fab onClick={handleOpen} className="addBtn" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
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
                            <h2 id="transition-modal-title">Add a new meeting</h2>
                            <form className="meetingDetailInput" noValidate autoComplete="off">
                                <TextField name="meetingTitle" onChange={handleChange} id="standard-secondary" label="Meeting title" />
                                <TextField
                                    name="meetingTime"
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    id="date"
                                    label="Meeting date"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField name="meetingLink" onChange={handleChange} id="standard-secondary" label="Meeting link" />
                                <Button type="submit" onClick={formSubmit} style={{marginTop:'1rem'}} variant="contained" color="primary">
                                    Add meeting
                                </Button>
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default AddMeetingBtn