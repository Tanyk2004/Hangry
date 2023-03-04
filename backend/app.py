from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Members API route
@app.route('/members')
def get_members():
    return {"members": "test", "members2": "test2"}

@app.route('/test-post', methods = ['POST'])
def test_post():
    todo_data = request.get_json()
    print(todo_data)
    try:
        print(todo_data['name']+ str(todo_data['age']))
    except:
        print("dictionary error")
    return 'hello world i hate programming', 200

if __name__ == '__main__':
    app.run(debug=True)
    print("Your server is running!")
