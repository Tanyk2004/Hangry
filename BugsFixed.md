# Bugs Fixed

* CORS issue: 
 - CORS was preventing the front end from making post and get requests to the backend because they were coming from different origins. This was fixed by adding the following to the backend:
    * we install flask-cors
    * we import CORS from flask_cors
    * we add CORS(app) to the bottom of the app.py file