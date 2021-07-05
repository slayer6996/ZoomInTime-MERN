# ZoomInTime-MERN
Add, remove, attend your meetings from one platform. ZoomInTime allows you to manage all of your meetings at one place.

---
/server/app.js
---
### root route 
- The post method is used to create a new user with email or redirect users to /meetings route if they already exist in DB 

### profile route 
- The delete method is used to delete user data of a logged in user from the DB 

### meetings route 
- get method is used to get information of all the meetings associated the logged in user.
- post method is used to add information regarding meetings into the DB 

### /meetings/:id route 
This route targets a specific meeting with its ID 
- patch method is used to update meeting information of an existing meeting in the DB of the user.
- delete method is used to delete a meeting from the DB of the user.
