import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth'
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './styles/profile.css'

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
        margin: '2rem',
        padding: '3rem',
    },
}));

function Profile(props) {
    let history=useHistory()


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { email, name } = props.user

    function signout() {
        firebase.auth().signOut().then(() => {
            window.location.reload(false)
        })
    }

    const deleteAccount=async () =>{
        firebase.auth().signOut()
        const res=await fetch("http://localhost:5000/profile",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email
            })
        })
        .then(() => {
            history.push("/")
            window.location.reload(false)
        })
    }    

    // function deleteAccount(){

    // }

    return (
        <>
            <BrowserRouter>
                <div className="profile">
                    <h1>Hello {name}</h1>
                    <div className="profileOptions">
                        <Link to="/">
                            <Button variant="outlined" onClick={signout}>sign out</Button>
                        </Link>
                        <div>
                            <Link to="/profile">
                                <Button variant="outlined" color="secondary" onClick={handleOpen}>Delete account</Button>
                            </Link>
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
                                        <h2 id="transition-modal-title">Are you sure you want to delete your account?</h2>
                                        <div className="profileOptions">
                                            <Button variant="outlined" onClick={deleteAccount}>Yes</Button>
                                            <Button variant="outlined" color="secondary">Cancel</Button>
                                        </div>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </>
    )
}

export default Profile