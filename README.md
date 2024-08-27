# E-Learning
About E-Learning <br>
In this project a student can enroll the course , read the course , learn from the courses , An Instructor can create, edit , delete the of his courses and admin has all the authorities like admin can make crud operations on user , lessons , course 
This project is not yet completed(Still on going) <br>

# How To Use 
this project contains the 2 main directories <br>
1. client ---- conatins the frontend part like forms and other things <br>
2. server ---- conatins the backend part like registering the user , creating the course and other things <br>

# To Run This Project
first run the command for git clone or download it manually <br> 
cd E-Learning/client ----- vite is used for creating react <br>
cd E-Learning/server <br>

# Commands
cd E-Learning/client --------- npm install <br>
cd E-Learning/server --------- npm install <br>

# Environment Variables
follow the envsample file(E-Learning/server ------ envsample) named .env and place it in server root folder <br>

# File structure
E-Learning conatins two folders <br>
E-Learning/client <br>
E-Learning/server <br>

# Client Folder  
1. pages ------- this contains all the pages used in the project <br>
2. components ----- this contains the navbar and footer <br>
3. contexnt ------ this container the contextApi for user state management <br>
4. utils ------ this contain sub folder <br>
4.1 utils/apicalls ------ this conatins axios getRequest , axios postRequest for sending to the server <br>
4.2 utils/userAuthorization -------- this conatins for getting the user from state and giving access to protected route and public route <br>

# Server Folder 
The server files contains <br>
1. controller ------ all controllers <br>
2. routes --------- all routes <br>
3. connection ----- connection of db (mongo-atlas) <br>
4. middleware ----- multer middleware and authmiddleware <br>
5. model --------- all schemas <br>
6. temp --------- storing temprory media file before saving in db <br>
7. enSample ------ for creating .env file <br>

# Server Code Run
cd E-Learning/server <br>
index.js is the entry point to run the server <br>
node index.js  or if u have nodemon - nodemon index.js <br>

# Client Code Run
cd E-Learning/client
npm run dev (vite)

# Note:
this project is still not handling the admin Dashboard (coming soon.....) <br>

# Schema-architecture 
https://app.eraser.io/workspace/RhPscosNNdfcWSig462E?origin=share