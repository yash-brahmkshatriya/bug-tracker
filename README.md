Technologies:
React
Node.js
Express.js
MongoDB

UI Library : Material UI
Color Palette: https://coolors.co/8c1c13-bf4342-e7d7c1-a78a7f-735751
selected : https://coolors.co/2b2d42-8d99ae-edf2f4-ef233c-d90429

Functionalities:
Auth - Token Based
Google OAuth
Test User
Types of Users:
Project Manager : Assign bugs to developers, create new Project and assign developer team to that project, Prioritizing of bugs
Developer : Resolve bug and post blog/comment
Bug Reporter : Reports bug
Admin : undefined

Models:
User:
Type
Name
Email
Profile Photo (optional)
Bug:
Type: BUG or QUERY
Title
Description
Reporter : Ref User
Seen: Boolean
Priority (only when BUG)
Comment:
Description
Commenter: Ref User
ThreadId : Ref Thread
Thread:
Bug : Ref Bug
Comments: [Comment]
isClosed : Boolean
Project:
Name
Project Manager (Ref User)
Developer Team : Array[Ref User]
Threads: [Ref Thread]
Tags
Stats (Only accessible by Project Manager)

Flow:
Backend
Models
Routes
Controls
Login / Signup
Figma UI Design
Color Palette
Design
Frontend
Landing Page
Login / Signup

Library:
@material/core
@material-ui/core
@material-ui/icons
Formik
Yup
Redux
react-redux
jwt
express
mongoose
cors
fotenv
dotenv
react-router-dom
axios
redux-thunk
redux-devtools-extension
google-auth-library
Nodemon

Versions:
v1:

Functionality:
Login / register for all (post)

User:
Bug report (post)
Threads {unsolved / solves / all} (get)
Specific thread (get)
Thead comment (post)
Comment / bug edit (put)
Project Manage:
Create project (post)
Project edit (put)
Team (add / delete developer)
Projects details
All project (get)
Specific project (get)
Threads {unsolved / solves / all} (get)
Assign priority to a thread (put)
Closing a thread (put)
Thead comment (post)
Comment edit (put)
Developer:
All project (get)
Specific project (get)
Threads {unsolved / solves / all} (get)
Thead comment (post)
Comment edit (put)
