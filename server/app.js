const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/ZoomInTimeUserDB", { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

const meetingSchema = new mongoose.Schema({
    title: String,
    time: String,
    date: String
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
    .post(function (req, res) {
        //finding user with the enter email if it exists then redirect to '/meetings' otherwise create a new user
        const userEmail = req.body.email
        User.findOne({ email: userEmail }, function (err, foundUser) {
            if (err) {
                console.log(err)
            } else if (foundUser) {
                console.log("user logged in")
                res.redirect('/meetings')
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
                        res.send("new user created successfully")
                    }
                })
            }
        })
    })

app.route('/profile')
    .delete(function (req, res) {
        //deleting the account of an existing user from the DB 
        const userId = req.body.id
        User.deleteOne({ _id: userId }, function (err) {
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

        const userEmail = req.body.email

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
        const meetingTime = req.body.meetingTime
        const meetingDate = req.body.meetingDate
        const userEmail = req.body.email
        //creating the new meeting with the details entered 
        const newMeeting = new Meeting({
            time: meetingTime,
            date: meetingDate
        })

        //finding currently logged in user and push the new meeting created into the meetings array of the user DB 
        User.findOne({ email: userEmail }, function (err, foundUser) {
            if (foundUser) {
                foundUser.meetings.push(newMeeting)
                //foundUser is a new document now of User model therefore we have to save it
                foundUser.save()
            } else {
                console.log("An error occured while creating the meeting")
                res.send("An error occured while creating the meeting")
            }
        })

    })

//route targeting a specific meeting with an id in the DB 

app.route('/meetings/:id')
    .patch(function (req, res) {
        // const meetingTitle=req.body.meetingTitle 
        // const meetingTime=req.body.meetingTime 
        // const meetingDate=req.body.meetingDate

        //since only some fields of the meetings might be updating patch is used 
        Meeting.updateOne({ _id: req.params.id }, { $set: req.body }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("updated meeting details successfully")
                res.send("updated meeting details successfully")
            }
        })
    })
    .delete(function(req,res){
        //deleting the meeting with the corresponding id
        Meeting.deleteOne({_id:req.params.id}, function(err){
            if(err){
                console.log(err)
            } else{
                console.log("deleted meeting successfully")
                res.send("deleted meeting successfully")
            }
        })
    })

app.listen(3000, function () {
    console.log("server running port 3000")
})