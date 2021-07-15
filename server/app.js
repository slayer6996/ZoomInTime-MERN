const express = require('express')
const cors=require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/ZoomInTimeUserDB", { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const meetingSchema = new mongoose.Schema({
    meetingTitle: String,
    meetingTime: String,
    meetingDate: String,
    meetingLink: String
})

const Meeting = new mongoose.model("Meeting", meetingSchema)

const userSchema = new mongoose.Schema({
    email: String,
    meetings: [meetingSchema]
})

const User = new mongoose.model("User", userSchema)

//Create user at '/' , delete user at '/profile'
//Create meetings at '/meetings' and read at '/meetings' update at '/meetings/:id' delete at '/meetings/:id'

app.route('/')
    .post(function (req) {
        //finding user with the enter email if it exists then redirect to '/meetings' otherwise create a new user
        const userEmail = req.body.email
        if(userEmail!==""){
            User.findOne({ email: userEmail }, function (err, foundUser) {
                if (err) {
                    console.log(err)
                } else if (foundUser) {
                    console.log("user logged in")
                } else {
                    const newUser = new User({
                        email: userEmail,
                        meetings: []
                    })
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("new user created successfully")
                        }
                    })
                }
            })
        }
    })

app.route('/profile')
    .delete(function (req, res) {
        //deleting the account of an existing user from the DB 
        const userEmail = req.body.email
        User.deleteOne({ email: userEmail }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("user account deleted successfully")
                res.send("user account deleted successfully")
            }
        })
    })

//route targeting all the meetings in DB 

app.route('/meetings')
    .get(function (req, res) {
        //reading all the meetings that exist in the DB with the email of the logged in user

        const userEmail = req.query.email

        User.find({ email: userEmail }, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                console.log(foundUser)
                res.send(foundUser)
            }
        })
    })
    .post(function (req, res) {
        //create a new meeting with the entered meeting name, date and time
        const meetingTitle = req.body.meetingTitle
        const meetingTime = req.body.meetingTime
        const meetingDate = req.body.meetingDate
        const meetingLink=req.body.meetingLink
        const userEmail = req.body.email
        //creating the new meeting with the details entered 
        const newMeeting = new Meeting({
            meetingTitle: meetingTitle,
            meetingTime: meetingTime,
            meetingDate: meetingDate,
            meetingLink: meetingLink
        })
        //finding currently logged in user and push the new meeting created into the meetings array of the user DB 
        User.findOne({ email: userEmail }, function (err, foundUser) {
            if (foundUser) {
                foundUser.meetings.push(newMeeting)
                //foundUser is a new document now of User model therefore we have to save it
                foundUser.save()
                console.log("created meeting successfully")
                res.send("meeting created")
            } else {
                console.log("An error occured while creating the meeting")
                res.send("An error occured while creating the meeting")
            }
        })

    })

//route targeting a specific meeting with an id in the DB 

app.route('/meetings/:id')
    .patch(function (req, res) {
        //since only some fields of the meetings might be updating patch is used 
        const userEmail = req.body.email
        User.findOne({ email: userEmail }, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else {
                const meeting = foundUser.meetings.id(req.params.id)
                meeting.meetingTitle = req.body.meetingTitle
                meeting.meetingTime = req.body.meetingTime
                meeting.meetingDate = req.body.meetingDate
                meeting.meetingLink=req.body.meetingLink
                //changes are made to the foundUser so it's needed to be saved 
                foundUser.save(err => {
                    if (err) {
                        res.send(err)
                    }
                })
            }
        })
    })
    .delete(function (req, res) {
        //deleting the meeting with the corresponding id
        const userEmail = req.body.email
        console.log(req.params.id)
        User.findOne({ email: userEmail }, function (err, foundUser) {
            if (err) {
                res.send(err)
                console.log(err)
            } else {
                foundUser.meetings.id(req.params.id).remove()
                //changes are made to the foundUser so it's needed to be saved 
                foundUser.save(err => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("deleted meeting")
                    }
                })
            }
        })
    })

app.listen(5000, function () {
    console.log("server running port 5000")
})