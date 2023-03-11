# Bugs Fixed

* CORS issue: 
 - CORS was preventing the front end from making post and get requests to the backend because they were coming from different origins. This was fixed by adding the following to the backend:
    * we install flask-cors
    * we import CORS from flask_cors
    * we add CORS(app) to the bottom of the app.py file

* How to revert Github to a previous commit:
- git reset --hard <commit hash>
- git push --force


# Libraries Installed
 * flask-cors
 * flask
 * CORS
 * axios (front end)
 * materials-ui (front end)
 * selenium (backend)
 * time (backend)
 * openpyxl (backend)
 * pandas (backend)
 * BeautifulSoup4 (backend)
 * nltk (backend)
 * requests (backend)
 * certifi (backend)
 * BeautifulSoup (backend)
 * 