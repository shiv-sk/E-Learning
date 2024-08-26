# E-Learning
About E-Learning 
In this project a student can enroll the course , read the course , learn from the courses , An Instructor can create, edit , delete the of his courses and admin has all the authorities like admin can make crud operations on user , lessons , course 
This project is not yet completed(Still on going)
#Installation
this project contains the 2 main directories 
1. client ---- conatins the frontend part like forms and other things
2. server ---- conatins the backend part like registering the user , creating the course and other things 
to run this project
first run the command for git clone or download it manually 
cd E-Learning/client -------- used the vite for creating the frontend part use vite create for react
cd E-Learning/server -------- npm install to install all the necessary packages to run this project
follow the env-sample file to add the env variables (provided in the server directory)

File structure
E-Learning/client/src ----- this contains 
1. pages ------- this folder contains all the pages like forms , coursedetail , homepage , errorpage , allcoursepage , creating coursepage and creating lesson page
2. components ----- this folder contains the navbar and footer
3. contexnt ------ this folder container the contextApi for user state management
4. utils ------ this folder contain sub folder
utils/apicalls ------ this conatins axios getRequest , axios postRequest for sending to the server
utils/userAuthorization -------- this conatins for getting the user from state and giving access to protected route and public route

E-Learning/server ------ this folder constains the connectionfolder , modelsfolder , controllerfolder and other folders
models ---- this contains all the schemas 
controllers ----- this contains the all the controllers
routes ------- this contains all the routes file
middleware ---- this contain sub files 1. auth 2. multer
middleware/auth ------ In auth file token verification is performing
middleware/multeer ----- In this file handling the files that is comming from client
utils ------- this file contain the cloudinary configuration this file helps to store the incomming media 


to run the backend-side 
cd E-Learning/server 
node index.js (entry-point of the project || if u want u can change in the package.json file entry-point)

to run the frontend-side
cd E-Learning/client
npm run dev (if u r using vite)

Note:
this project is still not handling the admin Dashboard (coming soon.....)
